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

    var songs = [{ "name": "(Unoffical) Sau L\u01b0ng", "artist": "Ano", "url": "Musics/(Unoffical) Sau L\u01b0ng - Ano.mp3" }, { "name": "Anh Nh\u1edb Em Ng\u01b0\u1eddi Y\u00eau C\u0169", "artist": "Minh V\u01b0\u01a1ng M4U", "url": "Musics/Anh Nh\u1edb Em Ng\u01b0\u1eddi Y\u00eau C\u0169 - Minh V\u01b0\u01a1ng M4U.mp3" }, { "name": "AnhDoiEmDuocKhongCover", "artist": "DigDiDzay", "url": "Musics/AnhDoiEmDuocKhongCover-DigDiDzay.mp3" }, { "name": "AnhLaTamSuCuaEm", "artist": "PhuongTrinhJolie", "url": "Musics/AnhLaTamSuCuaEm-PhuongTrinhJolie.mp3" }, { "name": "AnhSeOmEmHetMuaHoaRoi", "artist": "ChuTichKim", "url": "Musics/AnhSeOmEmHetMuaHoaRoi-ChuTichKim.mp3" }, { "name": "AnhSeOmEmHetMuaHoaRoiAcousticVersion", "artist": "ChuTichKim", "url": "Musics/AnhSeOmEmHetMuaHoaRoiAcousticVersion-ChuTichKim.mp3" }, { "name": "Apdoll", "artist": "5CMs  H.Y ( \u79d2\u901f5\u30bb\u30f3\u30c1\u30e1\u30fc\u30c8\u30eb )", "url": "Musics/Apdoll- 5CM-s - H.Y ( \u79d2\u901f5\u30bb\u30f3\u30c1\u30e1\u30fc\u30c8\u30eb ).mp3" }, { "name": "BABY BYE", "artist": "R.Tee ft Olia Ho\u00e0ng ( Prod By Tino D )", "url": "Musics/BABY BYE - R.Tee ft Olia Ho\u00e0ng ( Prod By Tino D ).mp3" }, { "name": "BuonKhongEm", "artist": "DatG", "url": "Musics/BuonKhongEm-DatG.mp3" }, { "name": "B\u1ec8 NG\u1ea0N HOA", "artist": "RTEE", "url": "Musics/B\u1ec8 NG\u1ea0N HOA - RTEE.mp3" }, { "name": "B\u1ee8C TH\u01af \u0110\u1ec2 L\u1ea0I (COVER FULL RAP)_ H\u1ed2 NG\u1eccC H\u00c0 x R.TEE.mp3", "artist": "", "url": "Musics/B\u1ee8C TH\u01af \u0110\u1ec2 L\u1ea0I (COVER FULL RAP)_ H\u1ed2 NG\u1eccC H\u00c0 x R.TEE.mp3" }, { "name": "Canh Dong Tuyet", "artist": "Minh Hang ft. Tim", "url": "Musics/Canh Dong Tuyet - Minh Hang ft. Tim.mp3" }, { "name": "CaoOc20", "artist": "BRayDatGMasewKICM", "url": "Musics/CaoOc20-BRayDatGMasewKICM.mp3" }, { "name": "ChieuHomAy", "artist": "JayKii", "url": "Musics/ChieuHomAy-JayKii.mp3" }, { "name": "Chi\u1ebfu Th\u1ee7y", "artist": "Decade (Prod. by Jurrivh)", "url": "Musics/Chi\u1ebfu Th\u1ee7y - Decade (Prod. by Jurrivh).mp3" }, { "name": "Ch\u1eafc", "artist": "Ano", "url": "Musics/Ch\u1eafc - Ano.mp3" }, { "name": "Co", "artist": "Khoi", "url": "Musics/Co-Khoi.mp3" }, { "name": "Con Chua Thay Toc Bo Xanh Bao Gio", "artist": "Ling", "url": "Musics/Con Chua Thay Toc Bo Xanh Bao Gio - Ling.mp3" }, { "name": "Criminal", "artist": "Britney Spears", "url": "Musics/Criminal - Britney Spears.mp3" }, { "name": "LetMeDownSlowly", "artist": "AlecBenjaminAlessiaCara", "url": "Musics/LetMeDownSlowly-AlecBenjaminAlessiaCara.mp3" }, { "name": "Li\u1ec7u Gi\u1edd", "artist": "2T, V\u0103n", "url": "Musics/Li\u1ec7u Gi\u1edd - 2T, V\u0103n.mp3" }, { "name": "Loi Do Em", "artist": "Miko Lan Trinh", "url": "Musics/Loi Do Em - Miko Lan Trinh.mp3" }, { "name": "Loi Hua Mua Dong", "artist": "Khanh Phuong", "url": "Musics/Loi Hua Mua Dong - Khanh Phuong.mp3" }, { "name": "MotChutQuenAnhThoi", "artist": "PhamAnhDuy", "url": "Musics/MotChutQuenAnhThoi-PhamAnhDuy.mp3" }, { "name": "M\u01b0a Th\u1ee7y Tinh", "artist": "Kh\u00e1nh Ph\u01b0\u01a1ng", "url": "Musics/M\u01b0a Th\u1ee7y Tinh - Kh\u00e1nh Ph\u01b0\u01a1ng.mp3" }, { "name": "Neu Khong Co Anh Ta", "artist": "Khanh Phuong", "url": "Musics/Neu Khong Co Anh Ta - Khanh Phuong.mp3" }, { "name": "NeuAnhDi.mp3", "artist": "", "url": "Musics/NeuAnhDi.mp3" }, { "name": "NgayChuaGiongBaoNguoiBatTuOst", "artist": "BuiLanHuong", "url": "Musics/NgayChuaGiongBaoNguoiBatTuOst-BuiLanHuong.mp3" }, { "name": "Nhu Mot Giac Mo.mp3", "artist": "", "url": "Musics/Nhu Mot Giac Mo.mp3" }, { "name": "NhungKeMongMo", "artist": "NooPhuocThinh", "url": "Musics/NhungKeMongMo-NooPhuocThinh.mp3" }, { "name": "Quave", "artist": "Ano (Prod. SPVCEMAN)", "url": "Musics/Quave - Ano (Prod. SPVCEMAN).mp3" }, { "name": "Qu\u00e1 Kh\u1ee9 Ch\u1ec9 N\u00ean L\u00e0 Qu\u00e1 Kh\u1ee9", "artist": "Andiez (Official Audio)", "url": "Musics/Qu\u00e1 Kh\u1ee9 Ch\u1ec9 N\u00ean L\u00e0 Qu\u00e1 Kh\u1ee9 - Andiez (Official Audio).mp3" }, { "name": "De Anh Phia Sau Em", "artist": "Khanh Phuong", "url": "Musics/De Anh Phia Sau Em - Khanh Phuong.mp3" }, { "name": "DoiAnhDenHoaCungTan", "artist": "DinhUyen", "url": "Musics/DoiAnhDenHoaCungTan-DinhUyen.mp3" }, { "name": "DotChay", "artist": "LinhCao", "url": "Musics/DotChay-LinhCao.mp3" }, { "name": "DuoiConMua", "artist": "LenaLenaTempoG", "url": "Musics/DuoiConMua-LenaLenaTempoG.mp3" }, { "name": "Duong Chan Troi", "artist": "Nguyen Hong Thuan ft. Truong The Vinh", "url": "Musics/Duong Chan Troi - Nguyen Hong Thuan ft. Truong The Vinh.mp3" }, { "name": "EmKhongThe", "artist": "TienTienTouliver", "url": "Musics/EmKhongThe-TienTienTouliver.mp3" }, { "name": "EmMoiLaNguoiYeuAnh", "artist": "MIN", "url": "Musics/EmMoiLaNguoiYeuAnh-MIN.mp3" }, { "name": "GiaTriCuaEmNamDau", "artist": "LinhCao", "url": "Musics/GiaTriCuaEmNamDau-LinhCao.mp3" }, { "name": "Hinh Bong Cua May", "artist": "KhanhPhuong", "url": "Musics/Hinh Bong Cua May - KhanhPhuong.mp3" }, { "name": "HOLD YOU DOWN", "artist": "Seachains Ft. Summer Vee", "url": "Musics/HOLD YOU DOWN - Seachains Ft. Summer Vee.mp3" }, { "name": "Hongkong1RnbVersion", "artist": "NguyenTrongTaiSanJi", "url": "Musics/Hongkong1RnbVersion-NguyenTrongTaiSanJi.mp3" }, { "name": "H\u1ea1 c\u00f3 c\u00f2n Kh\u00f3c  Crou x AndyOg x Mad.P x WinK.mp3", "artist": "", "url": "Musics/H\u1ea1 c\u00f3 c\u00f2n Kh\u00f3c  Crou x AndyOg x Mad.P x WinK.mp3" }, { "name": "H\u1ed3i \u0111\u00f3", "artist": "Sevenk (Prod. by Khoa Vu)", "url": "Musics/H\u1ed3i \u0111\u00f3 - Sevenk (Prod. by Khoa Vu).mp3" }, { "name": "I Am Sorry", "artist": "Khanh Phuong", "url": "Musics/I Am Sorry - Khanh Phuong.mp3" }, { "name": "Khoang", "artist": "CachChiaDoi", "url": "Musics/Khoang-Cach-Chia-Doi.mp3" }, { "name": "Khoc Them Lan Nua", "artist": "Bao Thy", "url": "Musics/Khoc Them Lan Nua - Bao Thy.mp3" }, { "name": "Khong Tho duoc", "artist": "Pham Quynh Anh", "url": "Musics/Khong Tho duoc - Pham Quynh Anh.mp3" }, { "name": "K\u1ebft", "artist": "Ano", "url": "Musics/K\u1ebft - Ano.mp3" }, { "name": "LangLeBuongRoTi", "artist": "RoTiYuniBoo", "url": "Musics/LangLeBuongRoTi-RoTiYuniBoo.mp3" }, { "name": "SauHomNay", "artist": "Khoi", "url": "Musics/SauHomNay-Khoi.mp3" }, { "name": "S\u1ebd", "artist": "Sevenk", "url": "Musics/S\u1ebd - Sevenk.mp3" }, { "name": "the sad song of black apple collection", "artist": "Black Apple", "url": "Musics/the sad song of black apple collection - Black Apple.mp3" }, { "name": "ThiAnhKhongBiet", "artist": "Khoi", "url": "Musics/ThiAnhKhongBiet-Khoi.mp3" }, { "name": "Thu \u0110i\u00ean", "artist": "Wang ft Galaxyy ft Zang", "url": "Musics/Thu \u0110i\u00ean - Wang ft Galaxyy ft Zang.mp3" }, { "name": "Tinh Yeu Cao Thuong 2", "artist": "Pham Quynh Anh", "url": "Musics/Tinh Yeu Cao Thuong 2 - Pham Quynh Anh.mp3" }, { "name": "TungYeu", "artist": "PhanDuyAnh", "url": "Musics/TungYeu-PhanDuyAnh.mp3" }, { "name": "T\u00e2m s\u1ef1 v\u1edbi ng\u01b0\u1eddi l\u1ea1", "artist": "TI\u00caN COOKIE", "url": "Musics/T\u00e2m s\u1ef1 v\u1edbi ng\u01b0\u1eddi l\u1ea1 - TI\u00caN COOKIE.mp3" }, { "name": "T\u1eebng Cho Nhau (Yong Bao Ni Li Qu Remake)", "artist": "H\u00e0 Nhi", "url": "Musics/T\u1eebng Cho Nhau (Yong Bao Ni Li Qu Remake) - H\u00e0 Nhi.mp3" }, { "name": "XnFrget", "artist": "Ano", "url": "Musics/XnFrget - Ano.mp3" }, { "name": "Yeu Nguoi Khac De Quen Em", "artist": "Khanh Phuong", "url": "Musics/Yeu Nguoi Khac De Quen Em - Khanh Phuong.mp3" }, { "name": "YeuNhauBaoLauXomTroDoiOST", "artist": "PhanManhQuynh", "url": "Musics/YeuNhauBaoLauXomTroDoiOST-PhanManhQuynh.mp3" }, { "name": "\u0110\u01b0\u1eddng Ch\u00e2n Tr\u1eddi", "artist": "Nguy\u1ec5n H\u1ed3ng Thu\u1eadn, Tr\u01b0\u01a1ng Th\u1ebf Vinh.flac", "url": "Musics/\u0110\u01b0\u1eddng Ch\u00e2n Tr\u1eddi - Nguy\u1ec5n H\u1ed3ng Thu\u1eadn, Tr\u01b0\u01a1ng Th\u1ebf Vinh.flac" }, { "name": "C\u1eeda Th\u1ee7y Tinh", "artist": "Ano (Prod. Manuel)", "url": "Musics/C\u1eeda Th\u1ee7y Tinh - Ano (Prod. Manuel).mp3" }, { "name": "LanhLeo", "artist": "AiPhuongBuiAnhTuan", "url": "Musics/LanhLeo-AiPhuongBuiAnhTuan.mp3" }, { "name": "Sao Em N\u1ee1.mp3", "artist": "", "url": "Musics/Sao Em N\u1ee1.mp3" }];

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
