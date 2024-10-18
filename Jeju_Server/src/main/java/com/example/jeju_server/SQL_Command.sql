CREATE TABLE user (
                      id INT PRIMARY KEY AUTO_INCREMENT,
                      email VARCHAR(255) NOT NULL UNIQUE,
                      password VARCHAR(255) NOT NULL,
                      name VARCHAR(100) NOT NULL,
                      role_name VARCHAR(50) NOT NULL,
                      enabled BOOLEAN NOT NULL
);

-- Activity 테이블
CREATE TABLE activity (
                          id INT PRIMARY KEY AUTO_INCREMENT,
                          name_ko VARCHAR(255) NOT NULL,         -- 한국어 이름
                          name_jp VARCHAR(255) NOT NULL,         -- 일본어 이름
                          latitude DOUBLE NOT NULL,
                          longitude DOUBLE NOT NULL,
                          address VARCHAR(255) NOT NULL,
                          image VARCHAR(255),
                          kakao_map VARCHAR(255),
                          keyword_ko JSON,                       -- 한국어 키워드
                          keyword_jp JSON,                       -- 일본어 키워드
                          likes INT,
                          explanation_ko TEXT,                   -- 한국어 설명
                          explanation_jp TEXT                    -- 일본어 설명
);

-- Attraction 테이블
CREATE TABLE attraction (
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            name_ko VARCHAR(255) NOT NULL,         -- 한국어 이름
                            name_jp VARCHAR(255) NOT NULL,         -- 일본어 이름
                            latitude DOUBLE NOT NULL,
                            longitude DOUBLE NOT NULL,
                            address VARCHAR(255) NOT NULL,
                            image VARCHAR(255),
                            kakao_map VARCHAR(255),
                            keyword_ko JSON,                       -- 한국어 키워드
                            keyword_jp JSON,                       -- 일본어 키워드
                            likes INT,
                            explanation_ko TEXT,                   -- 한국어 설명
                            explanation_jp TEXT                    -- 일본어 설명
);

-- Restaurant 테이블
CREATE TABLE restaurant (
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            name_ko VARCHAR(255) NOT NULL,         -- 한국어 이름
                            name_jp VARCHAR(255) NOT NULL,         -- 일본어 이름
                            latitude DOUBLE NOT NULL,
                            longitude DOUBLE NOT NULL,
                            address VARCHAR(255) NOT NULL,
                            image VARCHAR(255),
                            kakao_map VARCHAR(255),
                            keyword_ko JSON,                       -- 한국어 키워드
                            keyword_jp JSON,                       -- 일본어 키워드
                            likes INT,
                            explanation_ko TEXT,                   -- 한국어 설명
                            explanation_jp TEXT                    -- 일본어 설명
);

-- Accommodation 테이블
CREATE TABLE accommodation (
                               id INT PRIMARY KEY AUTO_INCREMENT,
                               name_ko VARCHAR(255) NOT NULL,         -- 한국어 이름
                               name_jp VARCHAR(255) NOT NULL,         -- 일본어 이름
                               latitude DOUBLE NOT NULL,
                               longitude DOUBLE NOT NULL,
                               address VARCHAR(255) NOT NULL,
                               image VARCHAR(255),
                               kakao_map VARCHAR(255),
                               keyword_ko JSON,                       -- 한국어 키워드
                               keyword_jp JSON,                       -- 일본어 키워드
                               likes INT,
                               explanation_ko TEXT,                   -- 한국어 설명
                               explanation_jp TEXT                    -- 일본어 설명
);

drop table activity;
drop table attraction;
drop table restaurant;
drop table accommodation;

INSERT INTO activity (name_ko, name_jp, latitude, longitude, address, image, kakao_map, keyword_ko, keyword_jp, likes, explanation_ko, explanation_jp) VALUES
                                                                                                                                                           ('9.81파크', '9.81パーク', 33.48524674045696, 126.4813953072775, '제주특별자치도 제주시 애월읍 천덕로 880-24 (우)63038', './images/activity/9.81파크.png', 'https://place.map.kakao.com/1868828759', JSON_ARRAY('카트', '테마파크'), JSON_ARRAY('カート', 'テーマパーク'), 18, '트랜디한 공간을 누비며 안에서 놀자!', 'トレンディな空間を走り回りながら楽しもう！'),
                                                                                                                                                           ('중문오프로드체험장', '中文オフロード体験場', 33.27269405033306, 126.39953539612095, '제주특별자치도 서귀포시 상예로 349 (우)63548', './images/activity/중문오프로드체험장.png', 'https://place.map.kakao.com/2049204914', JSON_ARRAY('ATV', '버기카'), JSON_ARRAY('ATV', 'バギーカー'), 12, '한여름의 스트레스를 날려버릴수 있는곳', '真夏のストレスを吹き飛ばせる場所'),
                                                                                                                                                           ('그랑블루 요트투어', 'グランブルーヨットツアー', 33.23830377923597, 126.43957882027829, '제주특별자치도 서귀포시 대포로 172-7 2층 (우)63543', './images/activity/그랑블루 요트투어.png', 'https://place.map.kakao.com/21500202', JSON_ARRAY('요트', '돌고래'), JSON_ARRAY('ヨット', 'イルカ'), 31, '🌀🌀또🌀물보라를🌀일으켜🌀🌀 ..다..🐬..다..🐬..다..🐬..다...🐬...다다다..🐬...다다다...', '🌀🌀また🌀水しぶきを🌀あげて🌀🌀 ..行く..🐬..行く..🐬..行く..🐬..行く...🐬...行く行く...🐬...行く行く...'),
                                                                                                                                                           ('제주레포츠랜드', '済州レジャーランド', 33.48207946266339, 126.63875292565251, '제주특별자치도 제주시 조천읍 와흘상서2길 47 (우)63344', './images/activity/제주레포츠랜드.png', 'https://place.map.kakao.com/11714326', JSON_ARRAY('카트', '짚라인'), JSON_ARRAY('カート', 'ジップライン'), 12, '국제경기를 할 수 있는 국내 최대 규모의 카트장', '国際試合もできる国内最大規模のカート場'),
                                                                                                                                                           ('김녕미로공원', '金寧迷路公園', 33.536542251240036, 126.77223637868113, '제주특별자치도 제주시 구좌읍 만장굴길 122 (우)63348', './images/activity/김녕미로공원.png', 'https://place.map.kakao.com/17110921', JSON_ARRAY('아이들', '공원'), JSON_ARRAY('子供', '公園'), 21, '오늘은 내가 테세우스', '今日は私がテセウスだ'),
                                                                                                                                                           ('윈드1947카트테마파크', 'ウィンド1947カートテーマパーク', 33.28952441639557, 126.58882248460405, '제주특별자치도 서귀포시 토평공단로 78-27 (우)63582', './images/activity/윈드1947카트테마파크.png', 'https://place.map.kakao.com/820826091', JSON_ARRAY('서바이벌', '카트'), JSON_ARRAY('サバイバル', 'カート'), 14, '총과 차를 즐길 수 있는 곳, 동시에 즐기는 건 무리.', '銃と車を楽しめる場所、同時に楽しむのは無理。'),
                                                                                                                                                           ('제주스쿠버스쿨', '済州スキューバスクール', 33.248470141825614, 126.52884626326131, '제주특별자치도 서귀포시 서호호근로46번길 68', './images/activity/제주스쿠버스쿨.jpg', 'https://place.map.kakao.com/1994825891', JSON_ARRAY('바다', '스쿠버다이빙'), JSON_ARRAY('海', 'スキューバダイビング'), 7, '제주 바다의 생태계를 몸으로 느껴보자!', '済州の海の生態系を体で感じてみよう！'),
                                                                                                                                                           ('서귀포잠수함', '西帰浦潜水艦', 33.23930334796222, 126.55860746924927, '제주특별자치도 서귀포시 남성중로 40', './images/activity/서귀포잠수함.jpg', 'https://place.map.kakao.com/7940952', JSON_ARRAY('바다', '잠수함'), JSON_ARRAY('海', '潜水艦'), 32, '관광잠수함 \'지야호\'와 함께하는 해저관광', '観光潜水艦「ジヤホ」と一緒にする海底観光'),
                                                                                                                                                           ('더마파크', 'ドーマパーク', 33.354123798743665, 126.24444970646005, '제주특별자치도 제주시 한림읍 월림리 2365', './images/activity/더마파크.jpg', 'https://place.map.kakao.com/11470870', JSON_ARRAY('승마', '체험'), JSON_ARRAY('乗馬', '体験'), 10, '승마 뿐만이 아니라 공연도 즐길 수 있는 곳', '乗馬だけでなく、ショーも楽しめる場所'),
                                                                                                                                                           ('송정농원', '松亭農園', 33.48002325111055, 126.564650782193, '제주특별자치도 제주시 연신로 293-13 (우)63308', './images/activity/송정농원.jpg', 'https://place.map.kakao.com/20203623', JSON_ARRAY('체험', '감귤'), JSON_ARRAY('体験', 'ミカン'), 19, '어이 김씨... 여기와서 감귤 좀 따!', 'おいキムさん...ここに来てミカンを取ってくれ！');

INSERT INTO attraction (name_ko, name_jp, latitude, longitude, address, image, kakao_map, keyword_ko, keyword_jp, likes, explanation_ko, explanation_jp) VALUES
                                                                                                                                                             ('쇠소깍', 'ソエソガク', 33.2542465079713, 126.6224024578273, '제주 서귀포시 쇠소깍로 104', './images/attraction/쇠소깍.png', 'https://place.map.kakao.com/7962003', JSON_ARRAY('하천', '카약'), JSON_ARRAY('川', 'カヤック'), 5, '제주에서 즐기는 카누', '済州で楽しむカヌー'),
                                                                                                                                                             ('섭지코지', 'ソプチコジ', 33.42397280993584, 126.93066673795128, '제주특별자치도 서귀포시 성산읍 섭지코지로 10', './images/attraction/섭지코지.png', 'https://place.map.kakao.com/8413659', JSON_ARRAY('경치', '산책'), JSON_ARRAY('景色', '散歩'), 10, '날씨가 좋으면 좋은데로 흐리면 흐린데로 좋은곳', '天気が良ければ良いし、曇っていても良い場所'),
                                                                                                                                                             ('성산일출봉', '城山日出峰', 33.45914086065641, 126.94059936778389, '제주특별자치도 서귀포시 성산읍 성산리 78', './images/attraction/성산일출봉.png', 'https://place.map.kakao.com/25285071', JSON_ARRAY('산봉우리', '일출'), JSON_ARRAY('山の頂上', '日の出'), 42, '동쪽 제주의 랜드마크', '済州東部のランドマーク'),
                                                                                                                                                             ('카멜리아 힐', 'カメリアヒル', 33.28964930723648, 126.37000936062226, '제주특별자치도 서귀포시 안덕면 병악로 166 (우)63526', './images/attraction/카멜리아 힐.png', 'https://place.map.kakao.com/9461977', JSON_ARRAY('핑크뮬리', '억새밭'), JSON_ARRAY('ピンクミューリー', 'ススキ畑'), 17, '겨울에도 꽃을 맞이할 수 있는 곳', '冬でも花を楽しめる場所'),
                                                                                                                                                             ('중문대포주상절리대', '中文大浦柱状節理帯', 33.237975112719525, 126.42632227570995, '제주특별자치도 서귀포시 이어도로 36-30 (우)63547', './images/attraction/중문대포주상절리대.png', 'https://place.map.kakao.com/10793668', JSON_ARRAY('일출', '풍경'), JSON_ARRAY('日の出', '風景'), 2, '눈으로 보는 관동별곡', '目で見る関東別曲'),
                                                                                                                                                             ('만장굴', '万丈窟', 33.52789508783337, 126.76934171688357, '제주특별자치도 제주시 구좌읍 만장굴길 182 (우)63348', './images/attraction/만장굴.png', 'https://place.map.kakao.com/7863269', JSON_ARRAY('세계자연유산', '동굴'), JSON_ARRAY('世界自然遺産', '洞窟'), 8, '여름에도 시원한 동굴체험', '夏でも涼しい洞窟体験'),
                                                                                                                                                             ('헬로키티아일랜드', 'ハローキティアイランド', 33.28995329799146, 126.35206166867718, '제주특별자치도 서귀포시 안덕면 상창리 1963-2', './images/attraction/헬로키티아일랜드.jpeg', 'https://place.map.kakao.com/26608807', JSON_ARRAY('테마파크', '가족'), JSON_ARRAY('テーマパーク', '家族'), 36, '우리나라 최대규모 헬로키티 파크', '韓国最大規模のハローキティパーク'),
                                                                                                                                                             ('빛의벙커', '光のバンカー', 33.43963754770691, 126.8998053540807, '제주특별자치도 서귀포시 성산읍 고성리 2039-22', './images/attraction/빛의벙커.jpeg', 'https://place.map.kakao.com/1682547680', JSON_ARRAY('미술관', '전시'), JSON_ARRAY('美術館', '展示'), 3, '다양한 미술을 다양한 방법으로 즐기는 곳', '様々なアートを様々な方法で楽しむ場所'),
                                                                                                                                                             ('제주냥이', '済州ネコ', 33.5335468530956, 126.8396584787566, '제주특별자치도 제주시 구좌읍 평대리 1982', './images/attraction/제주냥이.png', 'https://place.map.kakao.com/1960031145', JSON_ARRAY('소품샵', '카페'), JSON_ARRAY('雑貨ショップ', 'カフェ'), 19, '노란지붕아래 귀여운 냥이들', '黄色い屋根の下の可愛い猫たち'),
                                                                                                                                                             ('제주 성수미술관', '済州聖水美術館', 33.52689074350824, 126.88650268337703, '제주특별자치도 제주시 구좌읍 하도리 1743', './images/attraction/성수미술관.jpeg', 'https://place.map.kakao.com/125569847', JSON_ARRAY('경치', '체험'), JSON_ARRAY('風景', '体験'), 9, '그림같은풍경을 보며 그리는 그림', '絵のような風景を見ながら描く絵');

INSERT INTO restaurant (name_ko, name_jp, latitude, longitude, address, image, kakao_map, keyword_ko, keyword_jp, likes, explanation_ko, explanation_jp) VALUES
                                                                                                                                                             ('우진해장국', 'ウジンヘジャングク', 33.5108509899879, 126.5209117268871, '제주특별자치도 제주시 서사로 11', '../images/restaurant/우진해장국.png', 'https://place.map.kakao.com/11547525', JSON_ARRAY('해장국', '고사리해장국'), JSON_ARRAY('ヘジャングク', 'ワラビのヘジャングク'), 27, '백종원도 인정한 최고의 해장국 집! 서귀포 바다를 바라보며 먹는 오션뷰 대형 맛집', 'ペク・ジョンウォンも認めた最高のヘジャングク店！西帰浦の海を見ながら食べるオーシャンビューの大型レストラン'),
                                                                                                                                                             ('미영이네식당', 'ミヨンイネ食堂', 33.2162160961085, 126.25181555968082, '제주특별자치도 서귀포시 대정읍 하모항구로 42 (우)63506', '../images/restaurant/미영이네식당.png', 'https://place.map.kakao.com/9006988', JSON_ARRAY('회', '고등어회'), JSON_ARRAY('刺身', 'サバ刺身'), 18, '바다 냄새가 혀 안에서 감돈다. 진정한 제주 맛집을 알고 싶다면 바로 여기', '海の香りが舌の中に広がる。本物の済州の味を知りたいならここに来よう'),
                                                                                                                                                             ('아줄레주', 'アジュレジュ', 33.36683593131745, 126.83928908564187, '제주특별자치도 서귀포시 성산읍 신풍하동로19번길 59 나동 (우)63636', '../images/restaurant/아줄레주.png', 'https://place.map.kakao.com/2003360746', JSON_ARRAY('카페', '에그타르트'), JSON_ARRAY('カフェ', 'エッグタルト'), 15, '에그타르트도 맛있고 사진 찍기도 좋은 예쁜 카페', 'エッグタルトも美味しくて写真映えする可愛いカフェ'),
                                                                                                                                                             ('곰막식당', 'コムマク食堂', 33.556917554205135, 126.72059563908253, '제주특별자치도 제주시 구좌읍 구좌해안로 64 (우)63347', '../images/restaurant/곰막식당.jpeg', 'https://place.map.kakao.com/18421685', JSON_ARRAY('고등어회', '회국수'), JSON_ARRAY('サバ刺身', '刺身冷麺'), 56, '다른건 몰라도 제주도에서 "이것"은 먹고가자. 고등어회와 회국수가 일품인 곳.', '他はともかく、済州島でこれだけは食べていこう。サバ刺身と刺身冷麺が絶品の店。'),
                                                                                                                                                             ('제주 올래국수', '済州オレグクス', 33.50420955090063, 126.53442614805972, '제주특별자치도 제주시 월성로 39 (우)63162', '../images/restaurant/올래국수.png', 'https://place.map.kakao.com/559359242', JSON_ARRAY('고기국수', '비빔국수'), JSON_ARRAY('豚肉麺', 'ビビン麺'), 18, '양도 많고 가성비도 좋은 고기국수 맛집. 비빔국수의 양념과 야채가 고기와 함께 어울려 환상의 조합.', '量も多くコスパも良い豚肉麺の名店。ビビン麺のタレと野菜が豚肉と絶妙な組み合わせ。'),
                                                                                                                                                             ('스시 호시카이', 'スシ ホシカイ', 33.48876819230536, 126.51960387884634, '제주특별자치도 제주시 오남로 90 (우)63146', '../images/restaurant/스시호시카이.png', 'https://place.map.kakao.com/23718318', JSON_ARRAY('오마카세', '스시'), JSON_ARRAY('おまかせ', '寿司'), 33, '제주도의 3대 스시집 중 하나. 제주도 바다향이 느껴지는 듯한 스시 오마카세집이다.', '済州島の3大寿司店の一つ。済州の海の香りを感じられる寿司おまかせの店。'),
                                                                                                                                                             ('상춘재', 'サンチュンジェ', 33.460299081741255, 126.70522702035518, '제주특별자치도 제주시 조천읍 선진길 26 1층 (우)63341', '../images/restaurant/상춘재.png', 'https://place.map.kakao.com/12397273', JSON_ARRAY('성게', '돌문어'), JSON_ARRAY('ウニ', 'タコ'), 37, '상춘재만의 개성있는 맛! 성게 비빔밥과 돌문어 비빔밥은 웨이팅이 아깝지 않은 맛이다.', 'サンチュンジェだけの個性的な味！ウニビビンバとタコビビンバは待つ価値がある味。'),
                                                                                                                                                             ('살찐고등어', '太ったサバ', 33.526618605492864, 126.88470744711263, '제주특별자치도 제주시 구좌읍 해맞이해안로 1708 1층 (우)63363', '../images/restaurant/살찐고등어.png', 'https://place.map.kakao.com/379711544', JSON_ARRAY('흑돼지', '돈까스'), JSON_ARRAY('黒豚', 'トンカツ'), 41, '트러플 오일, 핑크 소금, 와사비 조합이 흑돼지 돈까스와 만났다. 육즙 가득한 흑돼지 돈까스 맛집!', 'トリュフオイル、ピンクソルト、ワサビの組み合わせが黒豚トンカツに出会った。ジューシーな黒豚トンカツの名店！'),
                                                                                                                                                             ('정성듬뿍제주국', '情がいっぱい済州スープ', 33.514028646873754, 126.52021343837903, '제주특별자치도 제주시 무근성7길 16 1층 (우)63166', '../images/restaurant/정성듬뿍제주국.png', 'https://place.map.kakao.com/13325715', JSON_ARRAY('각재기국', '국'), JSON_ARRAY('ガクジェギスープ', 'スープ'), 0, '제주도에서만 맛 볼 수 있는 깊은 맑은 국물! 멜튀김도 JMT', '済州島でしか味わえない深く澄んだスープ！メルト揚げもJMT'),
                                                                                                                                                             ('중문수두리보말칼국수', '中文水頭里ボマルカルグクス', 33.25156553343916, 126.42501016693603, '제주특별자치도 서귀포시 천제연로 192 1층 (우)63546', '../images/restaurant/중문수두리보말칼국수.png', 'https://place.map.kakao.com/1148098112', JSON_ARRAY('칼국수', '보말칼국수'), JSON_ARRAY('カルグクス', 'ボマルカルグクス'), 0, '사실 칼국수보다 전복죽이 더 맛있는 칼국수집', '実はカルグクスよりアワビ粥がもっと美味しいカルグクスの店');

INSERT INTO accommodation (name_ko, name_jp, latitude, longitude, address, image, kakao_map, keyword_ko, keyword_jp, likes, explanation_ko, explanation_jp) VALUES
                                                                                                                                                                ('와온', 'ワオン', 33.54450997473537, 126.66008407936904, '제주특별자치도 제주시 조천읍 함덕5길 8-15 (우)63333', '../images/accommodation/와온.png', 'https://place.map.kakao.com/84554460', JSON_ARRAY('펜션', '사우나'), JSON_ARRAY('ペンション', 'サウナ'), 36, '에메랄드 빛 바다와 포근한 바람이 부르는 함덕 구석의 돌집', 'エメラルド色の海と穏やかな風が呼ぶハムドクの片隅の石の家'),
                                                                                                                                                                ('의귀소담', 'ウィグイソダム', 33.30524221112696, 126.7202519861572, '제주특별자치도 서귀포시 남원읍 남조로 296-13 1층 (우)63618', '../images/accommodation/의귀소담.png', 'https://place.map.kakao.com/1537209042', JSON_ARRAY('노천탕', '조식 제공'), JSON_ARRAY('露天風呂', '朝食提供'), 19, '귤밭에 둘러 싸여져 있는', 'ミカン畑に囲まれた'),
                                                                                                                                                                ('폴개우엉', 'ポルゲウオン', 33.28381638687963, 126.74173667631047, '제주특별자치도 서귀포시 남원읍 태위로894번길 13 (우)63617', './images/accommodation/폴개우엉.png', 'https://place.map.kakao.com/1879458432', JSON_ARRAY('서귀포'), JSON_ARRAY('西帰浦'), 21, '제주도 남쪽, 두 갈래 길 중심에 빨간 지붕이 얹어진 곳. 폴개에서 우영[정원]을 걷다.', '済州島南部、二股の道の中心に赤い屋根が載った場所。ポルゲで庭を散歩する。'),
                                                                                                                                                                ('제주아인', '済州アイン', 33.555289235299675, 126.7492072868088, '제주특별자치도 제주시 구좌읍 김녕로11길 9-1 (우)63357', '../images/accommodation/제주아인.png', 'https://place.map.kakao.com/1888777377', JSON_ARRAY('독채펜션', '노천탕'), JSON_ARRAY('一軒家ペンション', '露天風呂'), 48, '김녕에 있는, 독채 바베큐와 야외 노천탕을 즐길 수 있는 곳', '金寧にある、一軒家バーベキューと屋外露天風呂が楽しめる場所'),
                                                                                                                                                                ('호텔창고펜션', 'ホテル倉庫ペンション', 33.26220568864041, 126.63833520974866, '제주특별자치도 서귀포시 남원읍 하례망장포로 37 (우)63613', '../images/accommodation/호텔창고펜션.png', 'https://place.map.kakao.com/2064886161', JSON_ARRAY('독채펜션', '수영장'), JSON_ARRAY('一軒家ペンション', 'プール'), 4, '제주도 한적한 시골에서 느낄 수 있는, 햇살 가득한 화려하면서 우아한 공간', '済州島の静かな田舎で感じることができる、陽光いっぱいの華麗で優雅な空間'),
                                                                                                                                                                ('게으른오후', '怠けた午後', 33.38377406646527, 126.2838442456143, '제주특별자치도 제주시 한림읍 중산간서로 4620 (우)63014', '../images/accommodation/게으른오후.png', 'https://place.map.kakao.com/1187373992', JSON_ARRAY('에어비앤비', '자쿠지'), JSON_ARRAY('エアビーアンドビー', 'ジャグジー'), 11, '1972년부터 이어온, 옛 정이 깃든 아날로그식 감성과 현대식의 편안함을 접목한 휴식공간', '1972年から続く、昔の情がこもったアナログ風の感性と現代的な快適さを融合させた休憩空間'),
                                                                                                                                                                ('산과바다', '山と海', 33.28381638687963, 126.74173667631047, '제주특별자치도 서귀포시 안덕면 사계남로 181 (우)63528', '../images/accommodation/산과바다.png', 'https://place.map.kakao.com/852057326', JSON_ARRAY('게스트하우스'), JSON_ARRAY('ゲストハウス'), 0, '산방산과 바다에 둘러쌓인, 제주의 고요함에서 벗어나 다양한 사람들과 어울릴 수 있는 곳', '山房山と海に囲まれた、済州の静けさから抜け出し、さまざまな人々と交わることができる場所'),
                                                                                                                                                                ('어느날문득제주', 'ある日突然済州', 33.53861795661364, 126.83456844406237, '제주특별자치도 제주시 구좌읍 계룡길 25-10 (우)63359', '../images/accommodation/어느날문득제주.png', 'https://place.map.kakao.com/27578867', JSON_ARRAY('독채', '구좌읍'), JSON_ARRAY('一軒家', '九座邑'), 50, '어느날, 문득, 제주에 왔다.', 'ある日、ふと、済州に来た。'),
                                                                                                                                                                ('광이멀스테이', '光が遠くステイ', 33.40593111335699, 126.30492542462534, '제주특별자치도 제주시 한림읍 월각로 151 (우)63022', '../images/accommodation/광이멀스테이.png', 'https://place.map.kakao.com/538350320', JSON_ARRAY('수영장', '협재'), JSON_ARRAY('プール', '挟材'), 2, '광야로 걸어가~', '荒野を歩いて~'),
                                                                                                                                                                ('제주스테이대흘', '済州ステイデフル', 33.509443937500805, 126.66726815540243, '제주특별자치도 제주시 조천읍 곱은달서길 60-24 (우)63343', '../images/accommodation/스테이대흘.png', 'https://place.map.kakao.com/290388887', JSON_ARRAY('독채', '프라이빗'), JSON_ARRAY('一軒家', 'プライベート'), 8, '사흘 나흘 묵어도 손색없는 숙소', '三日四日滞在しても申し分のない宿泊施設');
