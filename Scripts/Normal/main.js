var ImgBoost = {
    temp: { imgli: '{{#list}}<li><div class="tb-pic tb-s50"><a href="javascript:void(0)"><img data-src="{{{url}}}" src="{{{url}}}"></a></div></li>{{/list}}' },
    Option: { img: new Image(), imgdata: [] },
    InitImg: function () {
        if (ImgBoost.Option.img.width > 0 || ImgBoost.Option.img.height > 0) {
            clearInterval(ImgBoost.Option.set);
            $("#smallImg").attr("src", ImgBoost.Option.img.src);
            $("#baseImg").attr("src", ImgBoost.Option.img.src);
            $(".spZoom").width($(".divOverlay").width() * $(".smallImg").width() / ImgBoost.Option.img.width);
            $(".spZoom").height($(".divOverlay").height() * $(".smallImg").height() / ImgBoost.Option.img.height);
            $(".smallImg").unbind("hover").unbind("mousemove");
            $(".smallImg").hover(function () {
                $(".spZoom").show();
                $(".divOverlay").show();
            }, function () {
                $(".spZoom").hide();
                $(".divOverlay").hide();
            }).mousemove(function (e) {
                var xWidth = $(this).width();
                var yHegiht = $(this).height();
                var x = $(this).offset().left;
                var y = $(this).offset().top;
                var left = e.pageX - $(".spZoom").width() / 2;
                var top = e.pageY - $(".spZoom").height() / 2;

                if (left < x) {
                    left = x;
                }
                else if ((e.pageX + $(".spZoom").width() / 2) > (x + xWidth)) {
                    left = x + xWidth - $(".spZoom").width();
                }
                if (top < y) {
                    top = y;
                }
                else if ((e.pageY + $(".spZoom").height() / 2) > (y + yHegiht)) {
                    top = y + yHegiht - $(".spZoom").height();
                }
                $(".spZoom").offset({ left: left, top: top });

                $("#baseImg").offset({ left: $(".divOverlay").offset().left - (left - x) * $("#baseImg").width() / xWidth, top: $(".divOverlay").offset().top - (top - y) * $("#baseImg").height() / yHegiht });
            })
        }
    },
    ChangeImg: function (obj) {
        $("#imgList").find("li").removeClass("imgSelected");
        $(obj).addClass("imgSelected");
        ImgBoost.Option.img.src = $(obj).find("img").eq(0).attr("data-src");
        ImgBoost.Option.set = setInterval("ImgBoost.InitImg()", 50);
    },
    GetImgArr: function () {
        //测试，当编号是1的时候，获取数据，根据编号获取你要的JSON集合的IMG数据，建议此处要50*50的小图比较好
        if (this.Option.id && this.Option.id == 1) {
            this.Option.imgdata = [{ url: "images/1.jpg" }, { url: "images/2.jpg" }, { url: "images/3.jpg" }, { url: "images/4.jpg" }, { url: "images/5.jpg" }];
        }
    },
    Init: function (option) {
        $.extend(this.Option, option);
        this.GetImgArr();
        if (this.Option.imgdata.length > 0) {
            $("#imgList").html(Mustache.to_html(this.temp.imgli, { list: ImgBoost.Option.imgdata }));
            $("#imgList").find("li").eq(0).addClass("imgSelected");
            this.Option.img.src = this.Option.imgdata[0].url;
            $("#imgList").find("li").mouseenter(function () {
                ImgBoost.ChangeImg(this);
            });
            this.Option.set = setInterval("ImgBoost.InitImg()", 50);
            $(".divOverlay").offset({ top: $(".smallImg").offset().top, left: $(".smallImg").offset().left + $(".smallImg").width() + 10 });
        }
    }
}