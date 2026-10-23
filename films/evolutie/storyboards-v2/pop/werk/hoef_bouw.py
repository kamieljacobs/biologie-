"""Bouwt de vormen van de hoefdieren-pop uit de vlakke stijlplaat (referentie/pop/hoefdieren/stijl.png = paarden/stijl.png).
python3 referentie/pop/hoefdieren/werk/bouw.py   (vanuit /home/claude/evo2)
Per dier: silhouet (afstand tot de navy achtergrond), gewrichtspunten (px op de stijlplaat, gecorrigeerd naar tekstbronnen),
delen = silhouet geknipt met een gebied per deel (romp, hum, dij, nek, kop, kaak, staart), toonlagen = k-means-tonen binnen het deel.
Alles wordt omgerekend naar cm (y omlaag, grond 0, x = 0 midden onder de romp) en als blok HOEF_VORM in src/pop_hoef.js gezet."""
import cv2, numpy as np, json, re, os
H = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.abspath(os.path.join(H, '..', '..', '..', '..'))
IM = cv2.imread(os.path.join(H, '..', 'stijl.png')); BG = np.array([63, 40, 23], float)
UP = 4  # werk op 4x resolutie voor gladde randen

DIEREN = {
  # K = px per cm (schofthoogte op de plaat / schofthoogte uit tekstbron), G0 = grond (px), X0 = midden (px), sx = lengtecorrectie
  # paardachtigen ronde 3 (Kamiel): eigen plaat per dier; delen + tonen overgetrokken uit de VLAKKE onderste rij (staan), skelet geijkt op de realistische rij
  'paard': dict(plaat='../../paarden/paard.png', box=(0, 395, 272, 650), H=160, K=172 / 160, G0=642, X0=115, buik=545, poot=30, keel=4, snedeTerug=3, kruinUit=0, kopPlaat=dict(plaat='../../paarden/paard.png', box=(1078, 398, 1278, 645), poll=(1195, 445), neus=(1272, 573), snede=[(1172, 428), (1150, 556)], k=8, oog=(1205, 492)), sx=1.0, k=4, vlak=1, kapSchaal=0.5, geenKap=1,
    J={'midrug': (115, 475), 'nekBasis': (195, 505), 'lend': (85, 474), 'kruis': (55, 478), 'kop': (230, 422), 'neus': (264, 467), 'kaak': (232, 450), 'kin': (255, 470),
       'schoft': (160, 482), 'schouder': (190, 522), 'elleboog': (173, 550), 'pols': (175, 590), 'vkogel': (176, 628), 'vteen': (190, 642),
       'heup': (48, 512), 'knie': (67, 538), 'hak': (50, 581), 'akogel': (55, 625), 'ateen': (64, 642),
       'staart0': (34, 485), 'staart1': (26, 520), 'staart2': (21, 556), 'staart3': (18, 588), 'staart4': (15, 612)},
    staart=[(36, 478), (44, 490), (38, 520), (34, 560), (30, 622), (0, 622), (0, 478)], oog=(240, 438), neusgat=(260, 467), mond=[(245, 474), (258, 476)]),
  'ezel': dict(plaat='../../paarden/ezel-muilezel.png', box=(10, 415, 235, 650), H=110, K=147 / 110, G0=644, X0=100, buik=567, poot=28, keel=4, snedeTerug=3, kruinUit=0, kopPlaat=dict(plaat='../../paarden/ezel-muilezel.png', box=(150, 420, 240, 545), poll=(190, 475), neus=(224, 520), snede=[(172, 462), (180, 540)], k=6, oog=(198, 492), open=5, glad=0.9, oorZone=6, op=3), sx=1.0, k=4, vlak=1, kapSchaal=0.5, geenKap=1,
    J={'midrug': (100, 498), 'nekBasis': (170, 527), 'lend': (75, 497), 'kruis': (50, 503), 'kop': (190, 475), 'neus': (224, 520), 'kaak': (193, 505), 'kin': (215, 522),
       'schoft': (140, 510), 'schouder': (165, 545), 'elleboog': (144, 565), 'pols': (143, 605), 'vkogel': (143, 633), 'vteen': (153, 644),
       'heup': (52, 532), 'knie': (64, 552), 'hak': (40, 600), 'akogel': (38, 630), 'ateen': (46, 644),
       'staart0': (34, 518), 'staart1': (30, 545), 'staart2': (27, 568), 'staart3': (24, 588), 'staart4': (22, 606)},
    staart=[(34, 508), (38, 520), (34, 545), (30, 562), (29, 600), (10, 600), (12, 520), (26, 506)], oog=(190, 493), neusgat=(217, 524), mond=[(205, 530), (218, 532)]),
  'muilezel': dict(plaat='../../paarden/ezel-muilezel.png', box=(700, 395, 975, 650), H=130, K=179 / 130, G0=645, X0=800, buik=545, poot=32, keel=4, snedeTerug=3, kruinUit=0, kopPlaat=dict(plaat='../../paarden/ezel-muilezel.png', box=(885, 398, 975, 520), poll=(925, 430), neus=(962, 490), snede=[(905, 432), (912, 505)], k=6, oog=(937, 454), open=5, glad=0.9, oorZone=6, op=3), sx=1.0, k=4, vlak=1, kapSchaal=0.5, geenKap=1,
    J={'midrug': (800, 466), 'nekBasis': (875, 500), 'lend': (770, 465), 'kruis': (740, 470), 'kop': (925, 430), 'neus': (962, 490), 'kaak': (928, 465), 'kin': (952, 488),
       'schoft': (845, 483), 'schouder': (875, 524), 'elleboog': (858, 550), 'pols': (858, 595), 'vkogel': (859, 630), 'vteen': (868, 645),
       'heup': (745, 515), 'knie': (762, 538), 'hak': (740, 588), 'akogel': (744, 630), 'ateen': (754, 645),
       'staart0': (722, 485), 'staart1': (716, 520), 'staart2': (712, 550), 'staart3': (710, 575), 'staart4': (708, 600)},
    staart=[(726, 478), (730, 492), (724, 530), (722, 560), (718, 605), (690, 605), (690, 475)], oog=(937, 454), neusgat=(957, 491), mond=[(947, 500), (960, 502)]),
  'edelhert': dict(box=(92, 252, 372, 498), H=120, K=147 / 120, G0=492, X0=200, buik=417, poot=26, neusgat=(366, 346), mond=[(355, 352), (367, 351)], sx=1.0, k=5,
    J={'midrug': (200, 355), 'nekBasis': (285, 380), 'lend': (160, 357), 'kruis': (128, 365), 'kop': (320, 322), 'neus': (368, 346), 'kaak': (325, 345), 'kin': (355, 358),
       'schoft': (258, 364), 'schouder': (278, 390), 'elleboog': (262, 414), 'pols': (262, 449), 'vkogel': (262, 481), 'vteen': (270, 492),
       'heup': (140, 385), 'knie': (160, 416), 'hak': (126, 440), 'akogel': (130, 481), 'ateen': (138, 492),
       'staart0': (118, 366), 'staart1': (113, 378), 'staart2': (110, 388), 'staart3': (108, 396), 'staart4': (107, 404)},
    staart=[(121, 362), (126, 372), (118, 405), (95, 405), (95, 360)], oog=(338, 331),
    kopExtra=[(262, 250), (372, 250), (372, 340), (330, 330), (318, 318), (262, 318)]),
  'koe': dict(box=(477, 305, 800, 498), H=140, keel=0, K=167 / 140, G0=492, X0=620, buik=434, poot=40, neusgat=(791, 361), mond=[(772, 370), (788, 369)], kap='#834B30', kopOntwerp=dict(vorm=[(738, 317), (750, 314), (762, 319), (772, 329), (783, 342), (792, 353), (797, 359), (800, 366), (797, 373), (790, 376), (781, 375), (769, 372), (756, 369), (746, 364), (739, 355), (735, 343), (734, 330)], lob=[(752, 362), (740, 368), (730, 378), (719, 380), (714, 368), (722, 352), (732, 342), (748, 350)],  # keellob: keel loopt glad door in de hals
      lagen=[('#834B30', [(728, 318), (751, 316), (759, 327), (766, 343), (770, 358), (763, 369), (749, 368), (737, 377), (726, 382), (716, 378), (719, 360), (726, 344), (728, 330)]), ('#D8B6A6', [(789, 351), (797, 358), (800, 368), (792, 376), (784, 371), (786, 359)])],
      oor=[(746, 323), (732, 320), (718, 320), (710, 324), (716, 330), (731, 333), (746, 333)], oorBin=[(736, 326), (728, 324), (721, 324), (719, 326), (722, 328), (729, 329), (736, 329)],
      kin=[(770, 369), (790, 373), (788, 378), (772, 378)]), snedeTerug=3, kruinUit=0, sx=0.9, k=4,
    J={'midrug': (620, 333), 'nekBasis': (725, 370), 'lend': (575, 331), 'kruis': (520, 335), 'kop': (760, 318), 'neus': (797, 360), 'kaak': (765, 352), 'kin': (788, 368),
       'schoft': (695, 345), 'schouder': (722, 393), 'elleboog': (700, 424), 'pols': (702, 458), 'vkogel': (702, 482), 'vteen': (710, 492),
       'heup': (540, 370), 'knie': (568, 410), 'hak': (540, 445), 'akogel': (538, 482), 'ateen': (548, 492),
       'staart0': (500, 333), 'staart1': (495, 365), 'staart2': (493, 395), 'staart3': (491, 425), 'staart4': (489, 455)},
    staart=[(504, 326), (508, 345), (500, 400), (500, 470), (470, 470), (470, 320)], oog=(760, 339), onder=[(530, 395), (600, 395), (600, 460), (530, 460)]),
  'nijlpaard': dict(box=(865, 315, 1235, 495), H=150, K=163 / 150, G0=490, X0=1000, rompVoor=30, poot=60, keel=30, neusgat=(1224, 402), mond=[(1185, 428), (1232, 432)], ontwerp={'romp': [('#A7766F', [(948, 384), (962, 418), (988, 444), (1030, 453), (1072, 442), (1092, 412), (1072, 424), (1034, 432), (996, 427), (972, 408), (957, 386)]), ('#57494E', [(880, 345), (930, 330), (1000, 326), (1060, 330), (1100, 342), (1060, 340), (1000, 337), (935, 341), (890, 356)])],
      'nek': [('#A7766F', [(1118, 378), (1128, 372), (1134, 400), (1131, 428), (1122, 432), (1126, 404)]), ('#A7766F', [(1100, 384), (1108, 380), (1112, 410), (1108, 436), (1101, 434), (1104, 408)])],
      'kop': [('#A7766F', [(1136, 388), (1160, 384), (1188, 394), (1200, 412), (1192, 424), (1166, 426), (1144, 418)]), ('#B98680', [(1168, 377), (1176, 368), (1188, 368), (1195, 378), (1188, 388), (1175, 389)]), ('#B98680', [(1157, 350), (1163, 343), (1168, 350), (1164, 360)]), ('#8C6A6C', [(1212, 398), (1228, 400), (1236, 412), (1232, 424), (1218, 426)])],
      'kaak': [('#B98680', [(1166, 421), (1200, 425), (1235, 428), (1236, 434), (1200, 432), (1170, 428)])]}, sx=1.0, k=4,
    J={'midrug': (1000, 335), 'nekBasis': (1120, 375), 'lend': (950, 337), 'kruis': (885, 356), 'kop': (1170, 358), 'neus': (1230, 410), 'kaak': (1150, 404), 'kin': (1226, 444),
       'schoft': (1085, 370), 'schouder': (1110, 405), 'elleboog': (1085, 440), 'pols': (1088, 468), 'vkogel': (1088, 481), 'vteen': (1100, 490),
       'heup': (905, 400), 'knie': (935, 438), 'hak': (910, 462), 'akogel': (912, 481), 'ateen': (924, 490),
       'staart0': (874, 368), 'staart1': (869, 380), 'staart2': (866, 390), 'staart3': (864, 398), 'staart4': (863, 405)},
    staart=[(876, 362), (880, 372), (872, 410), (850, 410), (850, 355)], oog=(1181, 378),
    kaakLijn=[(1156, 422), (1234, 430)], kaakVorm=[(1142, 398), (1156, 420), (1200, 426), (1234, 428), (1238, 436), (1230, 444), (1206, 447), (1180, 445), (1160, 437), (1147, 421)]),
}

def hoeken(P, gr=55):  # scherpe hoek (snede tussen delen) markeren: de spline schiet daar anders door (bultje/inkeping)
    n = len(P); Q = []
    for i, p in enumerate(P):
        a, b = np.array(P[(i - 1) % n], float), np.array(P[(i + 1) % n], float); u, v = np.array(p) - a, b - np.array(p)
        if np.linalg.norm(u) < 1e-6 or np.linalg.norm(v) < 1e-6: Q.append(p); continue
        t = np.degrees(np.arccos(np.clip(np.dot(u, v) / np.linalg.norm(u) / np.linalg.norm(v), -1, 1)))
        Q.append([p[0], p[1], 1] if t > gr else p)
    return Q

def masker(D):
    IMD = D['_im']; x0, y0, x1, y1 = D['box']; sub = IMD[y0:y1, x0:x1].astype(float)
    d = np.linalg.norm(sub - BG, axis=2); m = ((d > 38) | ((d > 18) & (sub[:, :, 2] - sub[:, :, 0] > -14))).astype(np.uint8)  # donker (manen, zwarte benen): rood >= blauw, navy niet
    n, lab, st, _ = cv2.connectedComponentsWithStats(m); big = 1 + np.argmax(st[1:, 4]); m = (lab == big).astype(np.uint8)
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
    m = cv2.morphologyEx(m, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3)))  # losse haarslierten van de randlijn weg
    full = np.zeros(IM.shape[:2], np.uint8); full[y0:y1, x0:x1] = m
    return full

def tonen(D, m):
    cv2.setRNGSeed(7)
    px = D['_im'][m > 0].astype(np.float32); crit = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 60, 0.3)
    _, lab, cen = cv2.kmeans(px, D['k'], None, crit, 5, cv2.KMEANS_PP_CENTERS)
    L = np.full(IM.shape[:2], -1, np.int32); L[m > 0] = lab.ravel()
    return L, cen

# ---- koppen van paard, ezel en muilezel uit de kopplaat (koppen.png, rij 1, zuiver profiel) ----
KP = cv2.copyMakeBorder(cv2.imread(os.path.join(H, '..', 'koppen.png')), 60, 0, 0, 0, cv2.BORDER_REPLICATE); KBG = np.array([196, 198, 200], float); KPAD = 60  # ruimte boven de plaat voor verlengde oren
KOPPEN = {  # box, poll (achter de oren) en neuspunt op de plaat -> J.kop / J.neus van de pop; snede hals/kop; mondlijn; oog, neusgat
  'paard': dict(box=(180, 0, 440, 300), poll=(300, 64), neus=(431, 230), snede=[(280, 40), (257, 205)], mond=[(380, 240), (414, 256)], kin=[(380, 240), (416, 254), (424, 266), (398, 276), (372, 258)], oog=(333, 126), neusgat=(417, 230), k=5),
  'ezel': dict(box=(560, 0, 800, 320), poll=(662, 116), neus=(794, 276), snede=[(648, 30), (632, 268)], mond=[(745, 288), (786, 297)], kin=[(745, 288), (788, 296), (792, 306), (768, 314), (738, 298)], oog=(710, 175), neusgat=(783, 273), k=4, schaal=1.25, oren=[[(648, 118), (655, 70), (668, 30), (683, 8), (690, 12), (690, 50), (684, 90), (678, 120)], [(684, 105), (694, 60), (703, 20), (709, 13), (711, 25), (708, 65), (700, 100)]], tonen={'zd': 95, 'sd': 30, 'li': 42, 'lk': 0.62, 'blur': 4.5}),
  'muilezel': dict(box=(980, 0, 1240, 310), poll=(1090, 100), neus=(1234, 262), snede=[(1072, 30), (1058, 250)], mond=[(1185, 277), (1222, 290)], kin=[(1185, 277), (1224, 289), (1228, 298), (1206, 304), (1178, 288)], oog=(1137, 157), neusgat=(1220, 263), k=5),
}
def _schuif(v):
    if isinstance(v, tuple) and len(v) == 2 and all(isinstance(q, (int, float)) for q in v): return (v[0], v[1] + KPAD)
    if isinstance(v, list): return [_schuif(q) for q in v]
    return v
# ---- ONTWORPEN koppen (Kamiel: tonen ontwerpen, niet uit pixels halen): omtrek + 3–4 bewuste vlakken, punten op koppen.png (px) ----
def _ell(c, rx, ry, a=0, n=14): return [(c[0] + np.cos(t) * rx * np.cos(a) - np.sin(t) * ry * np.sin(a), c[1] + np.cos(t) * rx * np.sin(a) + np.sin(t) * ry * np.cos(a)) for t in np.linspace(0, 2 * np.pi, n, endpoint=False)]
KOPONTWERP = {
  'paard': dict(vorm=[(282, 48), (290, 55), (303, 30), (312, 12), (316, 30), (318, 45), (322, 22), (327, 12), (330, 30), (328, 58), (338, 78), (352, 103), (378, 148), (402, 182), (420, 205), (429, 218), (431, 232), (427, 248), (418, 258), (410, 262), (398, 268), (386, 262), (376, 252), (355, 240), (330, 222), (300, 212), (275, 205), (257, 205)],
    lagen=[('schaduw', [(262, 150), (290, 138), (322, 146), (340, 170), (336, 200), (316, 214), (285, 211), (262, 200)]),
           ('licht', [(336, 84), (352, 106), (380, 150), (405, 185), (417, 203), (409, 207), (392, 186), (366, 150), (343, 112), (331, 92)]),
           ('snuit', [(398, 206), (420, 204), (430, 222), (431, 244), (421, 259), (400, 268), (384, 262), (379, 246), (388, 222)]),
           ('donker', [(305, 30), (312, 16), (315, 38), (309, 52)]), ('donker', [(282, 48), (292, 52), (300, 66), (294, 80), (284, 72)])]),
  'ezel': dict(vorm=[(645, 100), (652, 80), (660, 50), (668, 18), (683, -22), (692, -14), (691, 30), (687, 80), (692, 70), (701, 30), (712, -18), (718, -8), (712, 50), (704, 95), (706, 115), (722, 140), (745, 180), (768, 222), (786, 252), (795, 268), (797, 285), (791, 300), (778, 307), (762, 312), (748, 305), (740, 294), (715, 288), (690, 280), (665, 270), (640, 262)],
    lagen=[('schaduw', [(652, 185), (690, 192), (714, 228), (706, 270), (670, 268), (648, 255)]),
           ('oorbin', [(667, 92), (672, 40), (683, 0), (687, 45), (682, 92)]),
           ('licht', [(756, 226), (780, 238), (795, 262), (798, 288), (791, 302), (770, 312), (751, 307), (740, 292), (746, 260)]), ('licht', _ell((711, 176), 15, 10, 0.2)),
           ('donker', [(670, 8), (683, -22), (692, -14), (691, 10), (678, 10)]), ('donker', [(704, 14), (712, -18), (718, -8), (714, 16)])]),
  'muilezel': dict(vorm=[(1068, 82), (1078, 60), (1088, 30), (1098, 6), (1106, 20), (1106, 60), (1112, 50), (1124, 25), (1137, 10), (1136, 40), (1128, 80), (1130, 105), (1150, 135), (1180, 180), (1210, 225), (1228, 250), (1236, 268), (1234, 285), (1224, 296), (1208, 302), (1192, 298), (1182, 282), (1160, 270), (1125, 258), (1095, 250), (1060, 244)],
    lagen=[('schaduw', [(1072, 168), (1110, 172), (1136, 205), (1132, 245), (1100, 248), (1070, 236)]),
           ('licht', [(1134, 110), (1156, 140), (1190, 188), (1214, 226), (1206, 231), (1180, 196), (1148, 150), (1126, 118)]),
           ('snuit', [(1194, 230), (1218, 240), (1234, 262), (1236, 285), (1224, 298), (1205, 303), (1188, 295), (1185, 265)]),
           ('oorbin', [(1090, 80), (1094, 40), (1099, 18), (1103, 50), (1100, 82)]), ('donker', [(1094, 22), (1098, 6), (1106, 20), (1104, 30)])]),
}
KOPKLEUR = {'paard': {'schaduw': 0.12, 'licht': (0.14, (226, 190, 160)), 'snuit': '#4A403E', 'donker': '#2A2220', 'oorbin': '#4A3A30'},
  'ezel': {'schaduw': 0.09, 'licht': '#DCD2CA', 'donker': '#3A3638', 'oorbin': '#B8ACA6'},
  'muilezel': {'schaduw': 0.11, 'licht': (0.12, (226, 196, 170)), 'snuit': '#C8B4A4', 'donker': '#2C2626', 'oorbin': '#9A7A66'}}

# ---- NIJLPAARDKOP ontworpen naar koppen.png (rij 2, bek wijd open): bovenkop = massieve snuit, onderkaak apart, in ruststand dichtgedraaid ----
NIJLKOP = dict(poll=(955, 398), neus=(1220, 375), scharnier=(1055, 500), hoek=(1080, 495), lipVoor=(1200, 412), kinOpen=(1195, 630),
  boven=[(900, 415), (945, 400), (955, 393), (967, 408), (980, 405), (1010, 385), (1035, 390), (1080, 375), (1125, 360), (1150, 345), (1180, 340), (1205, 350), (1220, 373), (1218, 400), (1200, 414), (1160, 440), (1120, 466), (1095, 484), (1082, 497), (1062, 522), (1025, 542), (950, 542), (900, 520)],
  onder=[(1052, 498), (1082, 495), (1100, 540), (1140, 608), (1180, 628), (1197, 630), (1198, 646), (1165, 662), (1120, 650), (1080, 612), (1058, 570), (1046, 525)],
  bovenLagen=[('#8C6A6A', [(995, 470), (1058, 452), (1090, 468), (1082, 495), (1062, 520), (1025, 540), (985, 522)]), ('#B98680', 'oog'), ('#B98680', [(949, 403), (955, 395), (963, 405), (957, 411)]),
    ('#57494E', [(1150, 349), (1180, 343), (1204, 352), (1218, 374), (1216, 398), (1201, 409), (1186, 394), (1166, 368)])],
  onderLagen=[],
  oog=(1015, 403), neusgat=(1190, 347), schaal=1.3,
  gehemelte=[(1203, 414), (1160, 429), (1120, 447), (1095, 471), (1082, 495)], onderLijn=[(1082, 495), (1100, 540), (1140, 608), (1180, 628), (1197, 630)],
  slag=[[(1146, 612), (1126, 540), 20], [(1182, 628), (1192, 550), 17]], bovenTand=[[(1186, 421), (1192, 448), 10], [(1150, 434), (1153, 458), 9]], snij=[[(1192, 630), (1216, 622), 8], [(1186, 634), (1212, 636), 8]],
  tong=[(1092, 520), (1110, 528), (1130, 560), (1150, 600), (1170, 612), (1130, 615), (1100, 580)])
def nijlKop(V):
    C = NIJLKOP; P0, P1 = np.array(C['poll'], float), np.array(C['neus'], float); Q0, Q1 = np.array(V['J']['kop']), np.array(V['J']['neus'])
    Q1 = Q0 + (Q1 - Q0) * C.get('schaal', 1.0); V['J']['neus'] = [round(float(Q1[0]), 2), round(float(Q1[1]), 2)]
    dp, dq = P1 - P0, Q1 - Q0; sc = np.linalg.norm(dq) / np.linalg.norm(dp); ang = np.arctan2(dq[1], dq[0]) - np.arctan2(dp[1], dp[0]); ca, sa = np.cos(ang) * sc, np.sin(ang) * sc
    T = lambda p: np.array([Q0[0] + ca * (p[0] - P0[0]) - sa * (p[1] - P0[1]), Q0[1] + sa * (p[0] - P0[0]) + ca * (p[1] - P0[1])])
    hoekBoven = np.arctan2(C['lipVoor'][1] - C['hoek'][1], C['lipVoor'][0] - C['hoek'][0]); hoekOnder = np.arctan2(C['kinOpen'][1] - C['hoek'][1], C['kinOpen'][0] - C['hoek'][0])
    S = T(C['scharnier']); lo_, up_ = T(C['onderLijn'][-1]) - S, T(C['lipVoor']) - S
    gaap = np.arctan2(lo_[1], lo_[0]) - np.arctan2(up_[1], up_[0]) + np.radians(9); cz, sz = np.cos(-gaap), np.sin(-gaap)  # sluiten: onderlip tegen bovenlip (om het scharnier), 12 graden overlap: de onderkaak schuift onder de holle bovenlip
    Tz = lambda p: (lambda q: [round(float(S[0] + cz * (q[0] - S[0]) - sz * (q[1] - S[1])), 2), round(float(S[1] + sz * (q[0] - S[0]) + cz * (q[1] - S[1])), 2)])(T(p))  # onderkaak dichtgedraaid
    R = lambda p: [round(float(v), 2) for v in T(p)]; base = V['delen']['romp']['c']
    oog = lambda: [R((C['oog'][0] + np.cos(t) * 13, C['oog'][1] + np.sin(t) * 10)) for t in np.linspace(0, 6.283, 14, endpoint=False)]
    V['delen']['kop'] = {'c': base, 'basis': [R(p) for p in C['boven']], 'lagen': [{'c': c, 'p': (oog() if pts == 'oog' else [R(p) for p in pts])} for c, pts in C['bovenLagen']]}
    V['delen']['kaak'] = {'c': base, 'basis': [Tz(p) for p in C['onder']], 'lagen': [{'c': c, 'p': [Tz(p) for p in pts]} for c, pts in C['onderLagen']]}
    V['J']['kaak'] = [round(float(S[0]), 2), round(float(S[1]), 2)]; V['J']['kin'] = Tz(C['kinOpen'])
    V['mondNijl'] = {'gehemelte': [R(p) for p in C['gehemelte']], 'onderLijn': [Tz(p) for p in C['onderLijn']], 'tong': [Tz(p) for p in C['tong']],
      'slag': [[Tz(b), Tz(t), w * sc] for b, t, w in C['slag']], 'snij': [[Tz(b), Tz(t), w * sc] for b, t, w in C['snij']], 'boven': [[R(b), R(t), w * sc] for b, t, w in C['bovenTand']]}
    V['mondLijn'] = [R(C['hoek']), R(C['lipVoor'])]; V['oog'] = R(C['oog']); V['neusgat'] = R(C['neusgat']); V['mond'] = [R(C['hoek']), R(C['hoek'])]
    print('nijlkop: plaat-gaap', round(float(np.degrees(gaap)), 1), 'graden, schaal', round(sc, 3))

# ---- kop vrijwel 1:1 overgetrokken uit de vlakke rij (Kamiel: 'het hoofd kan toch identiek zijn aan die van de plaat') ----
def kopVlak(D, V, Lb_, hexs, m_full, cmP_):
    """Zonder kopplaat: de kop uit de staande figuur zelf, met fijne tonen (oog, neusgat, bles, oor-binnenkant) in plaats van de grove lijftonen."""
    pass
def kopCloseup(V, C):
    im = cv2.imread(os.path.join(H, C['plaat'])); x0, y0, x1, y1 = C['box']; sub = im[y0:y1, x0:x1]; OP = C.get('op', 1); sub = cv2.resize(sub, None, fx=OP, fy=OP, interpolation=cv2.INTER_CUBIC) if OP > 1 else sub  # kleine uitsnede eerst opschalen: fijnere oren
    bg = np.array([65, 41, 27], float); m = (np.linalg.norm(sub.astype(float) - bg, axis=2) > 30).astype(np.uint8)
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8)) if OP == 1 else m; a, b = (np.array(C['snede'][0], float) - [x0, y0]) * OP, (np.array(C['snede'][1], float) - [x0, y0]) * OP
    d = b - a; nrm = np.array([d[1], -d[0]]); nrm /= np.linalg.norm(nrm); nrm = nrm if nrm[0] > 0 else -nrm
    yy, xx = np.mgrid[0:m.shape[0], 0:m.shape[1]]; m = m & (((xx - a[0]) * nrm[0] + (yy - a[1]) * nrm[1]) > 0).astype(np.uint8)
    n, lab, st, _ = cv2.connectedComponentsWithStats(m); m = (lab == 1 + np.argmax(st[1:, 4])).astype(np.uint8)
    mo = cv2.morphologyEx(m, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (C.get('open', 15) * OP,) * 2)); yy = np.arange(m.shape[0])[:, None]
    m = mo | (m & (yy < (C['poll'][1] - y0 + C.get('oorZone', 12)) * OP).astype(np.uint8))  # smalle reep hals onder de keel weg, oren blijven
    n, lab, st, _ = cv2.connectedComponentsWithStats(m); m = (lab == 1 + np.argmax(st[1:, 4])).astype(np.uint8)
    sm = cv2.pyrMeanShiftFiltering(sub, 7, 22); lab_ = cv2.cvtColor(sm, cv2.COLOR_BGR2LAB).astype(np.float32)
    cv2.setRNGSeed(5); px = lab_[m > 0]; crit = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 60, 0.3)
    _, labk, cenL = cv2.kmeans(px, C.get('k', 6), None, crit, 5, cv2.KMEANS_PP_CENTERS)
    cen = [cv2.cvtColor(np.uint8([[c]]), cv2.COLOR_LAB2BGR)[0, 0].astype(float) for c in np.clip(cenL, 0, 255)]
    cen = [np.mean(sub[m > 0][labk.ravel() == t], axis=0) for t in range(len(cen))]  # echte kleur per toon
    cnt = np.bincount(labk.ravel()); dom = int(np.argmax(cnt)); hx = lambda c: '#%02X%02X%02X' % (int(c[2]), int(c[1]), int(c[0]))
    P0, P1 = np.array(C['poll'], float), np.array(C['neus'], float); Q0, Q1 = np.array(V['J']['kop']), np.array(V['J']['neus']); Q1 = Q0 + (Q1 - Q0) * C.get('schaal', 1)
    dp, dq = P1 - P0, Q1 - Q0; sc = np.linalg.norm(dq) / np.linalg.norm(dp); an = np.arctan2(dq[1], dq[0]) - np.arctan2(dp[1], dp[0]); ca, sa = np.cos(an) * sc, np.sin(an) * sc
    T = lambda p: [round(float(Q0[0] + ca * (p[0] - P0[0]) - sa * (p[1] - P0[1])), 2), round(float(Q0[1] + sa * (p[0] - P0[0]) + ca * (p[1] - P0[1])), 2)]
    U = 4
    def cont(mm, minA, blur):
        up = cv2.resize(mm * 255, (mm.shape[1] * U, mm.shape[0] * U), interpolation=cv2.INTER_LINEAR); up = (cv2.GaussianBlur(up, (blur, blur), 0) > 127).astype(np.uint8)
        cs, _ = cv2.findContours(up, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE); res = []
        for c in sorted(cs, key=cv2.contourArea, reverse=True):
            if cv2.contourArea(c) < minA * U * U: continue
            res.append((cv2.contourArea(c), [T((p[0] / U / OP + x0, p[1] / U / OP + y0)) for p in cv2.approxPolyDP(c, 0.35 * U, True)[:, 0, :]]))
        return res
    basis = cont(m, 200, 9)[0][1]
    # gladde partitie: one-hot per toon opschalen, vervagen, argmax (donkere tonen zwaarder: oog, neusgat, mondlijn blijven)
    L = np.zeros(m.shape, np.int32); L[m > 0] = labk.ravel(); h_, w_ = m.shape; sig = C.get('glad', 2.2) * U * OP
    hel = [float(np.mean(c)) for c in cen]; S = []
    for t in range(len(cen)):
        oh = cv2.resize(((L == t) & (m > 0)).astype(np.float32), (w_ * U, h_ * U), interpolation=cv2.INTER_LINEAR)
        S.append(cv2.GaussianBlur(oh, (0, 0), sig * (0.5 if hel[t] < 70 else 1)) * (1.6 if hel[t] < 70 else 1))
    A = np.argmax(np.stack(S), 0); mu = cv2.resize(m.astype(np.uint8), (w_ * U, h_ * U), interpolation=cv2.INTER_NEAREST)
    tot = mu.sum(); lagen = []
    for t in range(len(cen)):
        if t == dom: continue
        tm = ((A == t) & (mu > 0)).astype(np.uint8); cs, _ = cv2.findContours(tm, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
        for c in cs:
            ar = cv2.contourArea(c)
            if ar < tot * (0.0008 if hel[t] < 70 else C.get('eiland', 0.006)): continue
            lagen.append((ar, {'c': hx(cen[t]), 'p': [T((p[0] / U / OP + x0, p[1] / U / OP + y0)) for p in cv2.approxPolyDP(c, 0.35 * U, True)[:, 0, :]]}))
    lagen = [l for _, l in sorted(lagen, key=lambda z: -z[0])]
    V['delen']['kop'] = {'c': hx(cen[dom]), 'basis': basis, 'lagen': lagen}
    V['J']['neus'] = [round(float(Q1[0]), 2), round(float(Q1[1]), 2)]
    if 'oog' in C: V['oog'] = T(C['oog'])
    print('kop close-up', len(basis), len(lagen), 'schaal', round(sc, 3))

def kopUitPlaat(naam, V):
    C = {k: (_schuif(v) if k not in ('k', 'schaal', 'tonen', 'box') else v) for k, v in KOPPEN[naam].items()}; bx = C['box']; C['box'] = (bx[0], 0, bx[2], bx[3] + KPAD)
    for i, oor in enumerate(C.get('oren', [])):  # oren 1,35x zo lang (vanaf de oorbasis); de plaat snijdt de punten bijna af
        b = np.mean([oor[0], oor[-1]], axis=0); C['oren'][i] = [tuple(b + (np.array(p) - b) * C.get('oorRek', 1.35)) for p in oor]
    x0, y0, x1, y1 = C['box']; sub = KP[y0:y1, x0:x1]
    m = (np.linalg.norm(sub.astype(float) - KBG, axis=2) > 22).astype(np.uint8)
    m = cv2.morphologyEx(m, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))); m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((5, 5), np.uint8))
    sn = np.zeros_like(m); a, b = np.array(C['snede'][0], float) - [x0, y0], np.array(C['snede'][1], float) - [x0, y0]
    d = b - a; nrm = np.array([d[1], -d[0]]); nrm /= np.linalg.norm(nrm); nrm = nrm if nrm[0] > 0 else -nrm  # naar voren (kop)
    yy, xx = np.mgrid[0:m.shape[0], 0:m.shape[1]]; kant = (xx - a[0]) * nrm[0] + (yy - a[1]) * nrm[1] > 0; m = m & kant.astype(np.uint8)
    n, lab, st, _ = cv2.connectedComponentsWithStats(m); m = (lab == 1 + np.argmax(st[1:, 4])).astype(np.uint8)
    # lichte snuit lijkt op de achtergrond: onderste helft (snuit) sterk sluiten, gaten vullen (lichte binnenkant van de oren)
    ylo = int(C['poll'][1] - y0 + 0.45 * (C['neus'][1] - C['poll'][1])); xlo = int(C['poll'][0] - x0 + 0.62 * (C['neus'][0] - C['poll'][0]))
    sn_ = m[ylo:, xlo:].copy(); cs_, _ = cv2.findContours(sn_, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    if cs_: hull = cv2.convexHull(np.vstack(cs_)); cv2.fillPoly(sn_, [hull], 1); m[ylo:, xlo:] |= sn_  # snuit rond (convex) in plaats van de lichte vacht die wegvalt
    for oor in C.get('oren', []): cv2.fillPoly(m, [np.array([[p[0] - x0, p[1] - y0] for p in oor], np.int32)], 1)
    ff = m.copy(); h_, w_ = m.shape; msk = np.zeros((h_ + 2, w_ + 2), np.uint8); cv2.floodFill(ff, msk, (0, 0), 1); m = m | (1 - ff)
    # vlakke tonen uit de helderheid (gladgestreken): zeer donker (neus, oorpunt), schaduw, basis, licht (snuit, oogring, kaakspier-glans)
    lum = cv2.GaussianBlur(cv2.cvtColor(sub, cv2.COLOR_BGR2GRAY).astype(float), (0, 0), C.get('tonen', {}).get('blur', 3.0))
    Ld = np.median(lum[m > 0]); lum[:KPAD] = Ld - 120  # verlengde oorpunten: donker (zoals bij ezels)
    base = V['delen']['romp']['c']; bb = np.array([int(base[1:3], 16), int(base[3:5], 16), int(base[5:7], 16)], float)
    mix = lambda c, k, t: '#%02X%02X%02X' % tuple(int(round(v)) for v in (bb * (1 - k) + np.array(t, float) * k))
    D_ = C.get('tonen', {})
    KL = [(lum < Ld - D_.get('zd', 62), mix(0, 0.72, (40, 34, 32))), ((lum >= Ld - D_.get('zd', 62)) & (lum < Ld - D_.get('sd', 24)), mix(0, 0.24, (20, 14, 12))), (lum > Ld + D_.get('li', 34), mix(0, D_.get('lk', 0.5), (246, 240, 232)))]
    # gelijkvormigheidstransformatie plaat -> rust-cm van de pop (poll -> J.kop, neus -> J.neus)
    P0, P1 = np.array(C['poll'], float), np.array(C['neus'], float); Q0, Q1 = np.array(V['J']['kop']), np.array(V['J']['neus'])
    Q1 = Q0 + (Q1 - Q0) * C.get('schaal', 1.0); V['J']['neus'] = [round(float(Q1[0]), 2), round(float(Q1[1]), 2)]  # kop langer (ezel: grote kop, bron ±0,4 x schofthoogte)
    dp, dq = P1 - P0, Q1 - Q0; sc = np.linalg.norm(dq) / np.linalg.norm(dp); ang = np.arctan2(dq[1], dq[0]) - np.arctan2(dp[1], dp[0]); ca, sa = np.cos(ang) * sc, np.sin(ang) * sc
    T = lambda p: [round(float(Q0[0] + ca * (p[0] - P0[0]) - sa * (p[1] - P0[1])), 2), round(float(Q0[1] + sa * (p[0] - P0[0]) + ca * (p[1] - P0[1])), 2)]
    U = 4
    def cont(mm, minA, eps, blur=9):
        up = cv2.resize(mm * 255, (mm.shape[1] * U, mm.shape[0] * U), interpolation=cv2.INTER_LINEAR); up = cv2.GaussianBlur(up, (blur, blur), 0); up = (up > 127).astype(np.uint8)
        cs, _ = cv2.findContours(up, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE); res = []
        for c in sorted(cs, key=cv2.contourArea, reverse=True):
            if cv2.contourArea(c) < minA * U * U: continue
            c = cv2.approxPolyDP(c, 0.5 * U, True)[:, 0, :]; res.append([T((p[0] / U + x0, p[1] / U + y0)) for p in c])
        return res
    basis = cont(m, 200, 0.5, 11)[0]
    # kaak (onderlip en kin) apart: onder de mondlijn
    km = np.zeros_like(m); cv2.fillPoly(km, [np.array([[p[0] - x0, p[1] - y0] for p in C['kin']], np.int32)], 1); km = km & m
    lagen = []
    for msk, col in KL:
        tm = (msk & (m > 0)).astype(np.uint8); tm = cv2.morphologyEx(tm, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8)); tm = cv2.morphologyEx(tm, cv2.MORPH_CLOSE, np.ones((7, 7), np.uint8))
        for c in cont(tm, 40, 0.6, 17): lagen.append({'c': col, 'p': c})
    V['delen']['kop'] = {'c': base, 'basis': basis, 'lagen': lagen}
    kb = cont(km, 20, 0.5, 9)
    if kb:
        kl = []
        for msk, col in KL:
            tm = (msk & (km > 0)).astype(np.uint8)
            for c in cont(tm, 8, 0.6, 9): kl.append({'c': col, 'p': c})
        V['delen']['kaak'] = {'c': base, 'basis': kb[0], 'lagen': kl}
    O = KOPONTWERP[naam]; KK = KOPKLEUR[naam]; sch = lambda p: (p[0], p[1] + KPAD)
    def rol(r):
        v = KK.get(r, '#000000')
        if isinstance(v, str): return v
        if isinstance(v, float): return '#%02X%02X%02X' % tuple(int(round(q * (1 - v))) for q in bb)
        k, t = v; return '#%02X%02X%02X' % tuple(int(round(q * (1 - k) + w * k)) for q, w in zip(bb, t))
    V['delen']['kop'] = {'c': base, 'basis': [T(sch(p)) for p in O['vorm']], 'lagen': [{'c': rol(r), 'p': [T(sch(p)) for p in pts]} for r, pts in O['lagen']]}
    V['delen']['kaak'] = {'c': base, 'basis': [T(p) for p in C['kin']], 'lagen': [{'c': rol('snuit' if 'snuit' in KK else 'licht'), 'p': [T(p) for p in C['kin']]}]}
    V['oog'] = T(C['oog']); V['neusgat'] = T(C['neusgat']); V['mond'] = [T(p) for p in C['mond']]
    print('kop', naam, len(basis), len(lagen), 'schaal', round(sc, 3))

def main():
    out = {}
    for naam, D in DIEREN.items():
        D['_im'] = cv2.imread(os.path.join(H, D['plaat'])) if 'plaat' in D else IM
        if D.get('vlak'): D.setdefault('openVlak', 3); D.setdefault('minVlak', 8); D.setdefault('vlakBlur', 13)
        K, G0, X0, sx = D['K'], D['G0'], D['X0'], D['sx']
        cmP = lambda p: [round((p[0] - X0) * sx / K, 2), round((p[1] - G0) / K, 2)]
        pxC = lambda c: (c[0] * K / sx + X0, c[1] * K + G0)  # cm -> px
        J = {k: cmP(v) for k, v in D['J'].items()}
        m = masker(D); KEELWEB = None
        if D.get('vlak'):  # rug-, schoft- en manenlijn glad: kleine inkepingen boven de buiklijn dicht (manenplukje bij de schoft)
            mc_ = cv2.morphologyEx(m, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (D.get('rugSluit', 15),) * 2)); yy_ = np.arange(m.shape[0])[:, None]
            m = m | (mc_ & (yy_ < D['buik'] - 25).astype(np.uint8))
            from scipy.ndimage import gaussian_filter1d
            xa, xb = int(D['J']['lend'][0]), int(D['J']['schoft'][0] + D.get('rugTot', 30)); top = np.array([np.argmax(m[:, x] > 0) for x in range(xa, xb)], float)
            ts = gaussian_filter1d(top, D.get('rugGlad', 4), mode='nearest'); ts = np.minimum(ts, top + 2) if D.get('rugHoog') else ts  # bultje en inkeping van het manenplukje weg
            for i, x in enumerate(range(xa, xb)): r = int(round(ts[i])); m[:r, x] = 0; m[r:int(top[i]) + 1, x] = 1
        L, cen = tonen(D, m)
        # randpixels (half navy) niet meetellen voor de toon: toon van de buur naar binnen
        er = cv2.erode(m, np.ones((5, 5), np.uint8))  # rand van 2 px (half navy, randlijn van de plaat) krijgt de toon van de dichtstbijzijnde binnenpixel
        from scipy import ndimage
        _, (iy, ix) = ndimage.distance_transform_edt(er == 0, return_indices=True)
        Lb = np.where(er > 0, L, L[iy, ix]); Lb[m == 0] = -1
        if D.get('vlak'):  # gladde partitie: elke toon als vervaagde kaart, argmax (geen trappen, geen spikkels); donker (manen) scherper
            hel_ = [float(np.mean(c)) for c in cen]; Sg = []
            for t in range(len(cen)):
                dk = hel_[t] < 60; Sg.append(cv2.GaussianBlur((Lb == t).astype(np.float32), (0, 0), D.get('glad', 3.5) * (0.45 if dk else 1)) * (1.4 if dk else 1))
            Lb = np.argmax(np.stack(Sg), 0).astype(Lb.dtype); Lb[m == 0] = -1
        hex_ = ['#%02X%02X%02X' % (int(c[2]), int(c[1]), int(c[0])) for c in cen]
        # gebieden (cm) per deel
        j = lambda k: np.array(J[k]); S = 18  # marge
        sch, sc, el, hp, kn, hk, nb, kp, ka = j('schoft'), j('schouder'), j('elleboog'), j('heup'), j('knie'), j('hak'), j('nekBasis'), j('kop'), j('kaak')
        zoom = D['H'] / 160
        ondY = 0 if 'romplaag' not in D else -D['romplaag']
        tr_ = D.get('snedeTerug', 0); P1 = kp + np.array([-6 - tr_, -14]) * zoom; P2 = ka + np.array([-6 - tr_, 10]) * zoom; dP = P2 - P1
        fw = np.array([-dP[1], dP[0]]) / np.linalg.norm(dP); fw = fw if fw[0] > 0 else -fw  # richting van de hals naar de kop
        G = {
          'romp': ([(-300, -400), (sch[0] + D.get('rompVoor', -6) * zoom, -400), (sch[0] + D.get('rompVoor', -6) * zoom, sch[1] - 12 * zoom)] if not D.get('vlak') else [(-300, -400), (sch[0] - 16 * zoom, -400), (sch[0] - 16 * zoom, sch[1] - 14 * zoom), (sch[0] - 4 * zoom, sch[1] - 2 * zoom)]) + [(sc[0] + 6 * zoom, sc[1] - 4 * zoom), (sc[0] + 40 * zoom, sc[1] + 4 * zoom), (sc[0] + 40 * zoom, ondY), (-300, ondY)],
          'hum': [(sch[0] - 14 * zoom, sch[1] - 6 * zoom), (sch[0] + 2 * zoom, sch[1] - 8 * zoom), (sc[0] + 6 * zoom, sc[1] - 4 * zoom), (sc[0] + 40 * zoom, sc[1] + 4 * zoom), (sc[0] + 40 * zoom, sc[1] + 0.55 * (el[1] - sc[1])), (el[0] + 10 * zoom, el[1] + 3 * zoom), (el[0] - 9 * zoom, el[1] + 3 * zoom), (el[0] - 15 * zoom, el[1] - 8 * zoom)],
          'dij': [(hp[0] + 34 * zoom, hp[1] - 34 * zoom), (hp[0] - 80 * zoom, hp[1] - 34 * zoom), (hp[0] - 80 * zoom, hp[1] + 0.3 * (kn[1] - hp[1])), (kn[0] - 7 * zoom, kn[1] - 1 * zoom), (kn[0] + 3 * zoom, kn[1] + 7 * zoom), (kn[0] + 12 * zoom, kn[1] + 2 * zoom)],
          'nek': [(sch[0] - (18 if D.get('vlak') else 6) * zoom, -400), tuple(P1 - dP * 6), tuple(P1), tuple(P1 + fw * D.get('kruinUit', 6) * zoom), tuple(P2 + fw * D.get('keel', 14) * zoom), tuple(P2 + dP * 0.6 + fw * D.get('keel', 14) * zoom), (sc[0] + 30 * zoom, sc[1] + 10 * zoom), (sc[0] - 25 * zoom, sc[1] + 10 * zoom)] + ([(sch[0] - 18 * zoom, sch[1] + 4 * zoom)] if D.get('vlak') else []),
          'kop': [tuple(P1 - dP * 6), (400, -400), (400, 0), tuple(P2 + dP * 0.6), tuple(P2), tuple(P1)],
        }
        if 'kopExtra' in D: G['kopX'] = [tuple(cmP(p)) for p in D['kopExtra']]
        G['staart'] = [tuple(cmP(p)) for p in D['staart']]
        if 'onder' in D: G['onder'] = [tuple(cmP(p)) for p in D['onder']]
        if 'kaakLijn' in D:
            a, b = [np.array(cmP(p)) for p in D['kaakLijn']]
            G['kaak'] = [tuple(cmP(p)) for p in D['kaakVorm']] if 'kaakVorm' in D else [tuple(a), tuple(b), tuple(b + [10, 40]), tuple(a + [-10, 40])]
            G['kop'] = [tuple(P1 - dP * 6), (400, -400), (400, b[1]), tuple(b), tuple(a), tuple(P2), tuple(P1)]
        # uitvoer per deel: basis = silhouet & gebied, lagen = tonen & basis
        def polyMask(poly):
            mm = np.zeros((IM.shape[0] * UP, IM.shape[1] * UP), np.uint8)
            pts = np.array([[(pxC(p)[0]) * UP, (pxC(p)[1]) * UP] for p in poly], np.int32); cv2.fillPoly(mm, [pts], 1); return mm
        mUp = cv2.resize(m * 255, (IM.shape[1] * UP, IM.shape[0] * UP), interpolation=cv2.INTER_LINEAR); mUp0 = mUp; mUp = cv2.GaussianBlur(mUp, ((27, 27) if D.get('vlak') else (15, 15)), 0)  # vlakke plaat: gladde omtrek (manenrand)
        if D.get('vlak'): kz = polyMask(G['kop']) | (polyMask(G['kopX']) if 'kopX' in G else 0); mUp = np.where(kz > 0, cv2.GaussianBlur(mUp0, (9, 9), 0), mUp)  # kop: oren blijven los
        mUp = (mUp > 127).astype(np.uint8)
        def contouren(mm, minA=60 * UP * UP, eps=0.45):
            cs, _ = cv2.findContours(mm, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE); res = []
            for c in sorted(cs, key=cv2.contourArea, reverse=True):
                if cv2.contourArea(c) < minA: continue
                c = cv2.approxPolyDP(c, eps * UP, True)[:, 0, :]
                res.append(hoeken([cmP((p[0] / UP, p[1] / UP)) for p in c]) if D.get('vlak') else [cmP((p[0] / UP, p[1] / UP)) for p in c])
            return res
        delen = {}
        gcnt = np.bincount(Lb[Lb >= 0], minlength=len(cen)); g0 = int(np.argmax(gcnt))  # één basiskleur voor het hele dier (anders naden)
        BM = {}
        for d in ['romp', 'hum', 'dij', 'nek', 'kop', 'staart', 'kaak']:
            if d not in G: continue
            pm = polyMask(G[d])
            if d == 'kop' and 'kopX' in G: pm = pm | polyMask(G['kopX'])
            if d == 'romp' and 'onder' in G: pm = pm | polyMask(G['onder'])
            if d in ('romp', 'dij', 'hum', 'nek'): pm = pm & (1 - polyMask(G['staart']))
            if d == 'nek' and 'kopX' in G: pm = pm & (1 - polyMask(G['kopX']))
            if d == 'romp' and 'poot' in D:  # poten weg: opening met een schijf breder dan een poot (alleen de romp blijft), randen iets ruimer
                ke = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (D['poot'], D['poot'])); m_ = m & (1 - cv2.resize(polyMask(G['staart']), (IM.shape[1], IM.shape[0]), interpolation=cv2.INTER_NEAREST)) if D.get('vlak') else m; op = cv2.dilate(cv2.morphologyEx(m_, cv2.MORPH_OPEN, ke), np.ones((3, 3), np.uint8))  # staart niet meetellen: anders blijft de achterkant van de dij als 'romp' hangen
                pm = pm & (cv2.resize(op * 255, (IM.shape[1] * UP, IM.shape[0] * UP), interpolation=cv2.INTER_LINEAR) > 127).astype(np.uint8)
            bm = (pm if (d == 'kaak' and 'kaakVorm' in D) else mUp & pm); cs = contouren(bm, minA=40 * UP * UP)
            if not cs: continue
            BM[d] = bm; delen[d] = {'c': hex_[g0], 'basis': cs[0], 'lagen': []}
        # keelkap: ovaal onder de overgang hals-kop, draait met de kop mee en wordt onder hals en kop getekend; vult het gat als de kop ver buigt
        mid = (P1 + P2) / 2 + fw * 1 * zoom; rr = np.linalg.norm(dP); ang0 = np.arctan2(dP[1], dP[0])
        ell = [tuple(mid + np.array([np.cos(ang0) * np.cos(t) * rr * 0.68 * D.get('kapSchaal', 1) - np.sin(ang0) * np.sin(t) * rr * 0.45 * D.get('kapSchaal', 1), np.sin(ang0) * np.cos(t) * rr * 0.68 * D.get('kapSchaal', 1) + np.cos(ang0) * np.sin(t) * rr * 0.45 * D.get('kapSchaal', 1)])) for t in np.linspace(0, 2 * np.pi, 28, endpoint=False)]
        em = cv2.resize(polyMask(ell), (IM.shape[1], IM.shape[0]), interpolation=cv2.INTER_NEAREST) & m
        kc = D.get('kap', hex_[g0])  # kleur van de hals bij de kop (koe: rood)
        kk = contouren(((polyMask(ell) & polyMask([(-400, kp[1] + 0.55 * (ka[1] - kp[1])), (400, kp[1] + 0.55 * (ka[1] - kp[1])), (400, 0), (-400, 0)])) | (mUp & polyMask(ell)) if D.get('kapVrij') else mUp & polyMask(ell)), minA=10 * UP * UP)  # koe: volle keel (kap mag buiten het plaatsilhouet)  # alleen binnen het silhouet (anders steekt de kap boven de kruin uit)
        if D.get('vlak'):  # keel-web: snijlijn hals/kop doorgetrokken tot de keelrand
            A_ = None
            for t_ in np.linspace(1, 3, 120):
                q = P1 + dP * t_; qx, qy = pxC(q)
                if not mUp[int(qy * UP), int(qx * UP)]: break
                A_ = q
            C_ = P1
            for t_ in np.linspace(0, 1, 120):
                q = P1 + dP * t_; qx, qy = pxC(q)
                if mUp[int(qy * UP), int(qx * UP)]: C_ = P1 + dP * min(1, t_ + 0.12); break
            P1 = C_
            if A_ is not None: KEELWEB = {'p': [[round(float(A_[0]), 2), round(float(A_[1]), 2), 1], [round(float(A_[0]) + 0.01, 2), round(float(A_[1]), 2), 1], [round(float(P1[0]), 2), round(float(P1[1]), 2), 1], [round(float(P1[0]) - 0.01, 2), round(float(P1[1]), 2), 1]], 'kop': [0, 1, 1, 0]}
        if kk and not D.get('geenKap'): delen['keelkap'] = {'c': kc, 'basis': kk[0], 'lagen': []}
        # toonlagen: elk samenhangend toonvlak hoort bij één deel (waar het grootste stuk ligt) en wordt niet door de deelgrens afgesneden
        x0, y0, x1, y1 = [v * UP for v in D['box']]
        if D.get('vlak'):  # u langs de hals (halsbasis 0 -> achterhoofd 1) per pixel
            gy, gx = np.mgrid[0:IM.shape[0] * UP, 0:IM.shape[1] * UP].astype(np.float32); nb_, kp_ = np.array(J['nekBasis']), np.array(J['kop']); dd_ = kp_ - nb_
            UU = (((gx / UP - X0) * sx / K - nb_[0]) * dd_[0] + ((gy / UP - G0) / K - nb_[1]) * dd_[1]) / float(dd_ @ dd_)
        ring = m - cv2.erode(m, np.ones((9, 9), np.uint8)); ringUp = cv2.resize(ring, (IM.shape[1] * UP, IM.shape[0] * UP), interpolation=cv2.INTER_NEAREST)
        KR = [np.zeros_like(mUp), None]
        for t in np.argsort(-gcnt):
            t = int(t)
            if t == g0: continue
            tm = (Lb == t).astype(np.uint8)
            # alleen grote, rustige vlakken (Kamiel: geen 'camouflage'): sterk openen/sluiten, flink vervagen, kleine vlakken weg
            ke = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (D.get('openVlak', 5),) * 2); tm = cv2.morphologyEx(tm, cv2.MORPH_OPEN, ke); tm = cv2.morphologyEx(tm, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9)))
            tUp = cv2.resize(tm * 255, (IM.shape[1] * UP, IM.shape[0] * UP), interpolation=cv2.INTER_LINEAR); tUp = cv2.GaussianBlur(tUp, (D.get('vlakBlur', 31),) * 2, 0)
            tUp = (tUp > 118).astype(np.uint8)[y0:y1, x0:x1]
            n, lab, st, _ = cv2.connectedComponentsWithStats(tUp)
            for i in range(1, n):
                if st[i, 4] < D.get('minVlak', 120) * UP * UP: continue
                comp = (lab == i)
                ov = {d: int((BM[d][y0:y1, x0:x1][comp]).sum()) for d in BM}
                d = max(ov, key=ov.get)
                if 'nek' in ov and ov['nek'] > 0.3 * st[i, 4]: d = 'nek'
                donker = sum(int(hex_[t][j:j + 2], 16) for j in (1, 3, 5)) < 180  # manen/staart (bijna zwart) altijd houden
                if D.get('vlak') and not donker and st[i, 4] < (0.0 if d == 'kop' else D.get('eiland', 0.02)) * BM[d].sum(): continue  # geen eilandjes: vlakken < 2% van het deel weg  # manen en halsvlakken horen bij de hals (buigen mee bij grazen)
                if ov[d] < 0.35 * st[i, 4]: continue  # ligt vooral in de poten (profielen)
                if not D.get('vlak') and (ringUp[y0:y1, x0:x1][comp]).mean() > 0.6: continue  # randglans van de plaat (smal toonvlak langs de omtrek)
                full = np.zeros_like(mUp); full[y0:y1, x0:x1] = comp.astype(np.uint8)
                if D.get('vlak') and donker and d in ('romp', 'hum') and (full & BM['nek']).sum() > 0.2 * full.sum(): KR[0] = KR[0] | full; KR[1] = hex_[t]; continue  # donker vlak onder de hals: ook naar het kruis
                if D.get('vlak') and donker and d == 'nek':  # donker vlak (manen + schouderkruis): alleen het deel voorbij de halsbasis buigt met de hals mee, de rest hoort bij de romp
                    hb = (UU > D.get('manenU', 0.12)).astype(np.uint8); rest = full & (1 - hb); full = full & hb
                    KR[0] = KR[0] | rest; KR[1] = hex_[t]  # schouderkruis / manenbegin: vast op de romp, boven de hals getekend
                for c in contouren(full, minA=10 * UP * UP, eps=0.35): delen[d]['lagen'].append({'c': hex_[t], 'p': c})
        if 'ontwerp' in D:  # tonen ontworpen (3 tonen), niet uit de plaatpixels
            for d_ in delen: delen[d_]['lagen'] = []
            for d_, ls in D['ontwerp'].items():
                if d_ in delen: delen[d_]['lagen'] = [{'c': c_, 'p': [cmP(p) for p in pts]} for c_, pts in ls]
        if D.get('vlak') and D.get('manenAuto', 1) and 'nek' in BM:  # manen als één glad donker vlak (donkere pixels in de hals, ruim gesloten)
            f_ = D['_im'].astype(int).sum(2); dk = ((f_ < D.get('manenDonker', 200)) & (m > 0)).astype(np.uint8)
            dk = cv2.morphologyEx(dk, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))); dk = cv2.morphologyEx(dk, cv2.MORPH_OPEN, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3)))
            dU = cv2.resize(dk * 255, (IM.shape[1] * UP, IM.shape[0] * UP), interpolation=cv2.INTER_LINEAR); dU = (cv2.GaussianBlur(dU, (11, 11), 0) > 110).astype(np.uint8)
            dU = cv2.dilate(dU, np.ones((5, 5), np.uint8)) & BM['nek']; n_, lb_, st_, _ = cv2.connectedComponentsWithStats(dU)
            if n_ > 1: dU = (lb_ == 1 + np.argmax(st_[1:, 4])).astype(np.uint8)  # alleen de manen (grootste donkere vlak), geen keelschaduw
            hb_ = (UU > D.get('manenU', 0.12)).astype(np.uint8); KR[0] = KR[0] | (dU & (1 - hb_)); KR[1] = KR[1] or '#1E1E1E'; dU = dU & hb_
            dU = cv2.dilate(dU, np.ones((3, 3), np.uint8))  # tot over de rand (wordt op de basis geknipt)
            for c in contouren(dU, minA=30 * UP * UP, eps=0.35): delen['nek']['lagen'].append({'c': '#1E1E1E' if naam == 'paard' else hex_[int(np.argmin([sum(c_) for c_ in cen]))], 'p': c})
        if D.get('vlak') and KR[0].any():
            cs_ = contouren(cv2.morphologyEx(KR[0], cv2.MORPH_CLOSE, np.ones((9, 9), np.uint8)), minA=10 * UP * UP, eps=0.35)
            if cs_: delen['kruis'] = {'c': KR[1], 'basis': cs_[0], 'lagen': []}
        if 'manen' in D: delen['nek']['lagen'].append({'c': '#3A3436' if naam == 'ezel' else '#2E2624', 'p': [cmP(p) for p in D['manen']]})  # ontworpen manenstrook (te smal voor de toonvlakken)
        om = contouren(mUp, eps=0.8)[0]
        if 'kaakLijn' in D: extra = {'mondLijn': [cmP(p) for p in D['kaakLijn']]}
        else: extra = {}
        out[naam] = {'J': J, 'delen': delen, 'tonen': hex_, 'oog': cmP(D['oog']), 'K': K, 'omtrek': om, 'neusgat': cmP(D['neusgat']), 'mond': [cmP(p) for p in D['mond']], **extra}
        if KEELWEB: out[naam]['keelweb'] = KEELWEB
        print(naam, {k: (len(v['basis']), len(v['lagen'])) for k, v in delen.items()}, hex_)
        if naam in KOPPEN and not D.get('vlak'): kopUitPlaat(naam, out[naam])
        if 'kopPlaat' in D: kopCloseup(out[naam], D['kopPlaat'])
        if 'kopOntwerp' in D:  # ontworpen kop (vaste vorm: plat voorhoofd, rechte neusrug, brede snuit, kaakhoek) + horizontaal uitstaand oor
            O = D['kopOntwerp']; out[naam]['delen']['kop'] = {'c': '#E8D7C6', 'basis': [cmP(p) for p in O['vorm']], 'lagen': [{'c': c, 'p': [cmP(p) for p in pts]} for c, pts in O['lagen']]}
            out[naam]['delen']['oor'] = {'c': '#6A3824', 'basis': [cmP(p) for p in O['oor']], 'lagen': [{'c': '#C99A88', 'p': [cmP(p) for p in O['oorBin']]}]}
            out[naam]['delen']['kaak'] = {'c': '#E8D7C6', 'basis': [cmP(p) for p in O['kin']], 'lagen': []}
            if 'lob' in O: out[naam]['delen']['keelkap'] = {'c': '#834B30', 'basis': [cmP(p) for p in O['lob']], 'lagen': []}  # keel onder de kaak: onder hals en kop, draait met de kop
        if naam == 'nijlpaard': nijlKop(out[naam])
    blok = '// <<HOEFVORM (gegenereerd door referentie/pop/hoefdieren/werk/bouw.py uit de stijlplaat; niet met de hand bewerken)\nconst HOEF_VORM = ' + json.dumps(out, separators=(',', ':')) + ';\n// HOEFVORM>>'
    f = os.path.join(ROOT, 'src', 'pop_hoef.js'); s = open(f).read() if os.path.exists(f) else '// <<HOEFVORM\n// HOEFVORM>>\n'
    s = re.sub(r'// <<HOEFVORM.*?// HOEFVORM>>', lambda mm: blok, s, flags=re.S); open(f, 'w').write(s); print('ok', len(blok))
main()
