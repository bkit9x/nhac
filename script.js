$(function () {
    var playerTrack = $("#player-track");
    var bgArtwork = $('#bg-artwork');
    var bgArtworkUrl;
    var albumName = $('#album-name');
    var trackName = $('#track-name');
    var albumArt = $('#album-art'),
        sArea = $('#s-area'),
        seekBar = $('#seek-bar'),
        trackTime = $('#track-time'),
        insTime = $('#ins-time'),
        sHover = $('#s-hover'),
        playPauseButton = $("#play-pause-button"),
        i = playPauseButton.find('i'),
        tProgress = $('#current-time'),
        tTime = $('#track-length'),
        seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0,
        buffInterval = null, tFlag = false;
    var playPreviousTrackButton = $('#play-previous'), playNextTrackButton = $('#play-next'), currIndex = -1;

    var songs = [{ "name": "(Unoffical) Sau L\u01b0ng", "artist": "Ano", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/%28Unoffical%29%20Sau%20L%C6%B0ng%20-%20Ano.mp3?raw=true" }, { "name": "Anh Nh\u1edb Em Ng\u01b0\u1eddi Y\u00eau C\u0169", "artist": "Minh V\u01b0\u01a1ng M4U", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/Anh%20Nh%E1%BB%9B%20Em%20Ng%C6%B0%E1%BB%9Di%20Y%C3%AAu%20C%C5%A9%20-%20Minh%20V%C6%B0%C6%A1ng%20M4U.mp3?raw=true" }, { "name": "AnhDoiEmDuocKhongCover", "artist": "DigDiDzay", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/AnhDoiEmDuocKhongCover-DigDiDzay.mp3?raw=true" }, { "name": "AnhLaTamSuCuaEm", "artist": "PhuongTrinhJolie", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/AnhLaTamSuCuaEm-PhuongTrinhJolie.mp3?raw=true" }, { "name": "AnhSeOmEmHetMuaHoaRoi", "artist": "ChuTichKim", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/AnhSeOmEmHetMuaHoaRoi-ChuTichKim.mp3?raw=true" }, { "name": "AnhSeOmEmHetMuaHoaRoiAcousticVersion", "artist": "ChuTichKim", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/AnhSeOmEmHetMuaHoaRoiAcousticVersion-ChuTichKim.mp3?raw=true" }, { "name": "Apdoll", "artist": "5CMs  H.Y ( \u79d2\u901f5\u30bb\u30f3\u30c1\u30e1\u30fc\u30c8\u30eb )", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/Apdoll-%205CM-s%20-%20H.Y%20%28%20%E7%A7%92%E9%80%9F5%E3%82%BB%E3%83%B3%E3%83%81%E3%83%A1%E3%83%BC%E3%83%88%E3%83%AB%20%29.mp3?raw=true" }, { "name": "BABY BYE", "artist": "R.Tee ft Olia Ho\u00e0ng ( Prod By Tino D )", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/BABY%20BYE%20-%20R.Tee%20ft%20Olia%20Ho%C3%A0ng%20%28%20Prod%20By%20Tino%20D%20%29.mp3?raw=true" }, { "name": "BuonKhongEm", "artist": "DatG", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/BuonKhongEm-DatG.mp3?raw=true" }, { "name": "B\u1ec8 NG\u1ea0N HOA", "artist": "RTEE", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/B%E1%BB%88%20NG%E1%BA%A0N%20HOA%20-%20RTEE.mp3?raw=true" }, { "name": "B\u1ee8C TH\u01af \u0110\u1ec2 L\u1ea0I (COVER FULL RAP)_ H\u1ed2 NG\u1eccC H\u00c0 x R.TEE.mp3", "artist": "", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/B%E1%BB%A8C%20TH%C6%AF%20%C4%90%E1%BB%82%20L%E1%BA%A0I%20%28COVER%20FULL%20RAP%29_%20H%E1%BB%92%20NG%E1%BB%8CC%20H%C3%80%20x%20R.TEE.mp3?raw=true" }, { "name": "Canh Dong Tuyet", "artist": "Minh Hang ft. Tim", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/Canh%20Dong%20Tuyet%20-%20Minh%20Hang%20ft.%20Tim.mp3?raw=true" }, { "name": "CaoOc20", "artist": "BRayDatGMasewKICM", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/CaoOc20-BRayDatGMasewKICM.mp3?raw=true" }, { "name": "ChieuHomAy", "artist": "JayKii", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/ChieuHomAy-JayKii.mp3?raw=true" }, { "name": "Chi\u1ebfu Th\u1ee7y", "artist": "Decade (Prod. by Jurrivh)", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/Chi%E1%BA%BFu%20Th%E1%BB%A7y%20-%20Decade%20%28Prod.%20by%20Jurrivh%29.mp3?raw=true" }, { "name": "Ch\u1eafc", "artist": "Ano", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/Ch%E1%BA%AFc%20-%20Ano.mp3?raw=true" }, { "name": "Co", "artist": "Khoi", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/Co-Khoi.mp3?raw=true" }, { "name": "Con Chua Thay Toc Bo Xanh Bao Gio", "artist": "Ling", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/Con%20Chua%20Thay%20Toc%20Bo%20Xanh%20Bao%20Gio%20-%20Ling.mp3?raw=true" }, { "name": "Criminal", "artist": "Britney Spears", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/Criminal%20-%20Britney%20Spears.mp3?raw=true" }, { "name": "LetMeDownSlowly", "artist": "AlecBenjaminAlessiaCara", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/LetMeDownSlowly-AlecBenjaminAlessiaCara.mp3?raw=true" }, { "name": "Li\u1ec7u Gi\u1edd", "artist": "2T, V\u0103n", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/Li%E1%BB%87u%20Gi%E1%BB%9D%20-%202T%2C%20V%C4%83n.mp3?raw=true" }, { "name": "Loi Do Em", "artist": "Miko Lan Trinh", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/Loi%20Do%20Em%20-%20Miko%20Lan%20Trinh.mp3?raw=true" }, { "name": "Loi Hua Mua Dong", "artist": "Khanh Phuong", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/Loi%20Hua%20Mua%20Dong%20-%20Khanh%20Phuong.mp3?raw=true" }, { "name": "MotChutQuenAnhThoi", "artist": "PhamAnhDuy", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/MotChutQuenAnhThoi-PhamAnhDuy.mp3?raw=true" }, { "name": "M\u01b0a Th\u1ee7y Tinh", "artist": "Kh\u00e1nh Ph\u01b0\u01a1ng", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/M%C6%B0a%20Th%E1%BB%A7y%20Tinh%20-%20Kh%C3%A1nh%20Ph%C6%B0%C6%A1ng.mp3?raw=true" }, { "name": "Neu Khong Co Anh Ta", "artist": "Khanh Phuong", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/Neu%20Khong%20Co%20Anh%20Ta%20-%20Khanh%20Phuong.mp3?raw=true" }, { "name": "NeuAnhDi.mp3", "artist": "", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/NeuAnhDi.mp3?raw=true" }, { "name": "NgayChuaGiongBaoNguoiBatTuOst", "artist": "BuiLanHuong", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/NgayChuaGiongBaoNguoiBatTuOst-BuiLanHuong.mp3?raw=true" }, { "name": "Nhu Mot Giac Mo.mp3", "artist": "", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/Nhu%20Mot%20Giac%20Mo.mp3?raw=true" }, { "name": "NhungKeMongMo", "artist": "NooPhuocThinh", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/NhungKeMongMo-NooPhuocThinh.mp3?raw=true" }, { "name": "Quave", "artist": "Ano (Prod. SPVCEMAN)", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/Quave%20-%20Ano%20%28Prod.%20SPVCEMAN%29.mp3?raw=true" }, { "name": "Qu\u00e1 Kh\u1ee9 Ch\u1ec9 N\u00ean L\u00e0 Qu\u00e1 Kh\u1ee9", "artist": "Andiez (Official Audio)", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/Qu%C3%A1%20Kh%E1%BB%A9%20Ch%E1%BB%89%20N%C3%AAn%20L%C3%A0%20Qu%C3%A1%20Kh%E1%BB%A9%20-%20Andiez%20%28Official%20Audio%29.mp3?raw=true" }, { "name": "De Anh Phia Sau Em", "artist": "Khanh Phuong", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/De%20Anh%20Phia%20Sau%20Em%20-%20Khanh%20Phuong.mp3?raw=true" }, { "name": "DoiAnhDenHoaCungTan", "artist": "DinhUyen", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/DoiAnhDenHoaCungTan-DinhUyen.mp3?raw=true" }, { "name": "DotChay", "artist": "LinhCao", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/DotChay-LinhCao.mp3?raw=true" }, { "name": "DuoiConMua", "artist": "LenaLenaTempoG", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/DuoiConMua-LenaLenaTempoG.mp3?raw=true" }, { "name": "Duong Chan Troi", "artist": "Nguyen Hong Thuan ft. Truong The Vinh", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/Duong%20Chan%20Troi%20-%20Nguyen%20Hong%20Thuan%20ft.%20Truong%20The%20Vinh.mp3?raw=true" }, { "name": "EmKhongThe", "artist": "TienTienTouliver", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/EmKhongThe-TienTienTouliver.mp3?raw=true" }, { "name": "EmMoiLaNguoiYeuAnh", "artist": "MIN", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/EmMoiLaNguoiYeuAnh-MIN.mp3?raw=true" }, { "name": "GiaTriCuaEmNamDau", "artist": "LinhCao", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/GiaTriCuaEmNamDau-LinhCao.mp3?raw=true" }, { "name": "Hinh Bong Cua May", "artist": "KhanhPhuong", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/Hinh%20Bong%20Cua%20May%20-%20KhanhPhuong.mp3?raw=true" }, { "name": "HOLD YOU DOWN", "artist": "Seachains Ft. Summer Vee", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/HOLD%20YOU%20DOWN%20-%20Seachains%20Ft.%20Summer%20Vee.mp3?raw=true" }, { "name": "Hongkong1RnbVersion", "artist": "NguyenTrongTaiSanJi", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/Hongkong1RnbVersion-NguyenTrongTaiSanJi.mp3?raw=true" }, { "name": "H\u1ea1 c\u00f3 c\u00f2n Kh\u00f3c  Crou x AndyOg x Mad.P x WinK.mp3", "artist": "", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/H%E1%BA%A1%20c%C3%B3%20c%C3%B2n%20Kh%C3%B3c%20%20Crou%20x%20AndyOg%20x%20Mad.P%20x%20WinK.mp3?raw=true" }, { "name": "H\u1ed3i \u0111\u00f3", "artist": "Sevenk (Prod. by Khoa Vu)", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/H%E1%BB%93i%20%C4%91%C3%B3%20-%20Sevenk%20%28Prod.%20by%20Khoa%20Vu%29.mp3?raw=true" }, { "name": "I Am Sorry", "artist": "Khanh Phuong", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/I%20Am%20Sorry%20-%20Khanh%20Phuong.mp3?raw=true" }, { "name": "Khoang", "artist": "CachChiaDoi", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/Khoang-Cach-Chia-Doi.mp3?raw=true" }, { "name": "Khoc Them Lan Nua", "artist": "Bao Thy", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/Khoc%20Them%20Lan%20Nua%20-%20Bao%20Thy.mp3?raw=true" }, { "name": "Khong Tho duoc", "artist": "Pham Quynh Anh", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/Khong%20Tho%20duoc%20-%20Pham%20Quynh%20Anh.mp3?raw=true" }, { "name": "K\u1ebft", "artist": "Ano", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/K%E1%BA%BFt%20-%20Ano.mp3?raw=true" }, { "name": "LangLeBuongRoTi", "artist": "RoTiYuniBoo", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/LangLeBuongRoTi-RoTiYuniBoo.mp3?raw=true" }, { "name": "SauHomNay", "artist": "Khoi", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/SauHomNay-Khoi.mp3?raw=true" }, { "name": "S\u1ebd", "artist": "Sevenk", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/S%E1%BA%BD%20-%20Sevenk.mp3?raw=true" }, { "name": "the sad song of black apple collection", "artist": "Black Apple", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/the%20sad%20song%20of%20black%20apple%20collection%20-%20Black%20Apple.mp3?raw=true" }, { "name": "ThiAnhKhongBiet", "artist": "Khoi", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/ThiAnhKhongBiet-Khoi.mp3?raw=true" }, { "name": "Thu \u0110i\u00ean", "artist": "Wang ft Galaxyy ft Zang", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/Thu%20%C4%90i%C3%AAn%20-%20Wang%20ft%20Galaxyy%20ft%20Zang.mp3?raw=true" }, { "name": "Tinh Yeu Cao Thuong 2", "artist": "Pham Quynh Anh", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/Tinh%20Yeu%20Cao%20Thuong%202%20-%20Pham%20Quynh%20Anh.mp3?raw=true" }, { "name": "TungYeu", "artist": "PhanDuyAnh", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/TungYeu-PhanDuyAnh.mp3?raw=true" }, { "name": "T\u00e2m s\u1ef1 v\u1edbi ng\u01b0\u1eddi l\u1ea1", "artist": "TI\u00caN COOKIE", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/T%C3%A2m%20s%E1%BB%B1%20v%E1%BB%9Bi%20ng%C6%B0%E1%BB%9Di%20l%E1%BA%A1%20-%20TI%C3%8AN%20COOKIE.mp3?raw=true" }, { "name": "T\u1eebng Cho Nhau (Yong Bao Ni Li Qu Remake)", "artist": "H\u00e0 Nhi", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/T%E1%BB%ABng%20Cho%20Nhau%20%28Yong%20Bao%20Ni%20Li%20Qu%20Remake%29%20-%20H%C3%A0%20Nhi.mp3?raw=true" }, { "name": "XnFrget", "artist": "Ano", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/XnFrget%20-%20Ano.mp3?raw=true" }, { "name": "Yeu Nguoi Khac De Quen Em", "artist": "Khanh Phuong", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/Yeu%20Nguoi%20Khac%20De%20Quen%20Em%20-%20Khanh%20Phuong.mp3?raw=true" }, { "name": "YeuNhauBaoLauXomTroDoiOST", "artist": "PhanManhQuynh", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/YeuNhauBaoLauXomTroDoiOST-PhanManhQuynh.mp3?raw=true" }, { "name": "\u0110\u01b0\u1eddng Ch\u00e2n Tr\u1eddi", "artist": "Nguy\u1ec5n H\u1ed3ng Thu\u1eadn, Tr\u01b0\u01a1ng Th\u1ebf Vinh.flac", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/%C4%90%C6%B0%E1%BB%9Dng%20Ch%C3%A2n%20Tr%E1%BB%9Di%20-%20Nguy%E1%BB%85n%20H%E1%BB%93ng%20Thu%E1%BA%ADn%2C%20Tr%C6%B0%C6%A1ng%20Th%E1%BA%BF%20Vinh.flac?raw=true" }, { "name": "C\u1eeda Th\u1ee7y Tinh", "artist": "Ano (Prod. Manuel)", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/C%E1%BB%ADa%20Th%E1%BB%A7y%20Tinh%20-%20Ano%20%28Prod.%20Manuel%29.mp3?raw=true" }, { "name": "LanhLeo", "artist": "AiPhuongBuiAnhTuan", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/LanhLeo-AiPhuongBuiAnhTuan.mp3?raw=true" }, { "name": "Sao Em N\u1ee1.mp3", "artist": "", "url": "https://github.com/bkit9x/nhac/blob/main/Musics/Sao%20Em%20N%E1%BB%A1.mp3?raw=true" }];

    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
    songs = shuffle(songs);

    function playPause() {
        setTimeout(function () {
            if (audio.paused) {
                playerTrack.addClass('active');
                albumArt.addClass('active');
                checkBuffering();
                i.attr('class', 'fas fa-pause');
                audio.play();
            }
            else {
                playerTrack.removeClass('active');
                albumArt.removeClass('active');
                clearInterval(buffInterval);
                albumArt.removeClass('buffering');
                i.attr('class', 'fas fa-play');
                audio.pause();
            }
        }, 300);
    }


    function showHover(event) {
        seekBarPos = sArea.offset();
        seekT = event.clientX - seekBarPos.left;
        seekLoc = audio.duration * (seekT / sArea.outerWidth());

        sHover.width(seekT);

        cM = seekLoc / 60;

        ctMinutes = Math.floor(cM);
        ctSeconds = Math.floor(seekLoc - ctMinutes * 60);

        if ((ctMinutes < 0) || (ctSeconds < 0))
            return;

        if ((ctMinutes < 0) || (ctSeconds < 0))
            return;

        if (ctMinutes < 10)
            ctMinutes = '0' + ctMinutes;
        if (ctSeconds < 10)
            ctSeconds = '0' + ctSeconds;

        if (isNaN(ctMinutes) || isNaN(ctSeconds))
            insTime.text('--:--');
        else
            insTime.text(ctMinutes + ':' + ctSeconds);

        insTime.css({ 'left': seekT, 'margin-left': '-21px' }).fadeIn(0);

    }

    function hideHover() {
        sHover.width(0);
        insTime.text('00:00').css({ 'left': '0px', 'margin-left': '0px' }).fadeOut(0);
    }

    function playFromClickedPos() {
        audio.currentTime = seekLoc;
        seekBar.width(seekT);
        hideHover();
    }

    function updateCurrTime() {
        nTime = new Date();
        nTime = nTime.getTime();

        if (!tFlag) {
            tFlag = true;
            trackTime.addClass('active');
        }

        curMinutes = Math.floor(audio.currentTime / 60);
        curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

        durMinutes = Math.floor(audio.duration / 60);
        durSeconds = Math.floor(audio.duration - durMinutes * 60);

        playProgress = (audio.currentTime / audio.duration) * 100;

        if (curMinutes < 10)
            curMinutes = '0' + curMinutes;
        if (curSeconds < 10)
            curSeconds = '0' + curSeconds;

        if (durMinutes < 10)
            durMinutes = '0' + durMinutes;
        if (durSeconds < 10)
            durSeconds = '0' + durSeconds;

        if (isNaN(curMinutes) || isNaN(curSeconds))
            tProgress.text('00:00');
        else
            tProgress.text(curMinutes + ':' + curSeconds);

        if (isNaN(durMinutes) || isNaN(durSeconds))
            tTime.text('00:00');
        else
            tTime.text(durMinutes + ':' + durSeconds);

        if (isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds))
            trackTime.removeClass('active');
        else
            trackTime.addClass('active');


        seekBar.width(playProgress + '%');

        if (playProgress == 100) {
            i.attr('class', 'fa fa-play');
            seekBar.width(0);
            tProgress.text('00:00');
            albumArt.removeClass('buffering').removeClass('active');
            clearInterval(buffInterval);
            selectTrack(1);
        }
    }

    function checkBuffering() {
        clearInterval(buffInterval);
        buffInterval = setInterval(function () {
            if ((nTime == 0) || (bTime - nTime) > 1000)
                albumArt.addClass('buffering');
            else
                albumArt.removeClass('buffering');

            bTime = new Date();
            bTime = bTime.getTime();

        }, 100);
    }


    function selectTrack(flag) {
        if (flag == 0 || flag == 1)
            ++currIndex;
        else
            --currIndex;

        if ((currIndex > -1) && (currIndex < songs.length)) {
            if (flag == 0)
                i.attr('class', 'fa fa-play');
            else {
                albumArt.removeClass('buffering');
                i.attr('class', 'fa fa-pause');
            }

            seekBar.width(0);
            trackTime.removeClass('active');
            tProgress.text('00:00');
            tTime.text('00:00');

            currAlbum = songs[currIndex].name;
            currTrackName = songs[currIndex].artist;
            currArtwork = songs[currIndex].picture;

            audio.src = songs[currIndex].url;

            nTime = 0;
            bTime = new Date();
            bTime = bTime.getTime();

            if (flag != 0) {
                audio.play();
                playerTrack.addClass('active');
                albumArt.addClass('active');

                clearInterval(buffInterval);
                checkBuffering();
            }

            albumName.text(currAlbum);
            trackName.text(currTrackName);
            $('#album-art img').prop('src', bgArtworkUrl);
        }
        else {
            if (flag == 0 || flag == 1)
                --currIndex;
            else
                ++currIndex;
        }
    }

    function initPlayer() {
        addListMusic();
        audio = new Audio();

        selectTrack(0);

        audio.loop = false;

        playPauseButton.on('click', playPause);

        sArea.mousemove(function (event) { showHover(event); });

        sArea.mouseout(hideHover);

        sArea.on('click', playFromClickedPos);

        $(audio).on('timeupdate', updateCurrTime);

        playPreviousTrackButton.on('click', function () { selectTrack(-1); });
        playNextTrackButton.on('click', function () { selectTrack(1); });
        $('.li-music').click(function () {
            play($(this).attr('data-id'));
        });

    }

    function addListMusic() {
        var listMusic = $('#list-music');
        for (var i = 0; i < songs.length; i++) {
            listMusic.append('<li class="li-music" data-id="' + i + '"><div class="list-name">' + songs[i].name + '</div><div class="list-artist">' + songs[i].artist + '</div></li>');
        }
    }
    function play(index) {
        currIndex = index;
        albumArt.removeClass('buffering');
        i.attr('class', 'fa fa-pause');
        seekBar.width(0);
        trackTime.removeClass('active');
        tProgress.text('00:00');
        tTime.text('00:00');

        currAlbum = songs[currIndex].name;
        currTrackName = songs[currIndex].artist;
        currArtwork = songs[currIndex].picture;

        audio.src = songs[currIndex].url;

        nTime = 0;
        bTime = new Date();
        bTime = bTime.getTime();

        audio.play();
        playerTrack.addClass('active');
        albumArt.addClass('active');

        clearInterval(buffInterval);
        checkBuffering();
        albumName.text(currAlbum);
        trackName.text(currTrackName);
        $('#album-art img').prop('src', bgArtworkUrl);
    }
    initPlayer();
});
