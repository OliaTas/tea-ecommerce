$(document).ready(function () {

    //Кнопка перехода к началу страницы
    function backToTop() {
        const buttonUp = $('.back-to-top');

        $(window).on('scroll', () => {
            if ($(this).scrollTop() >= 50) {
                buttonUp.fadeIn();
                $('.header').css('background', '#878a82');
            } else {
                buttonUp.fadeOut();
                $('.header').css('background', 0);
            }

        });

        buttonUp.on('click', (e) => {
            e.preventDefault();
            $('html').animate({ scrollTop: 0 }, 1000)
        })
    }
    backToTop();


    new WOW({
        animateClass: 'animate__animated'
    }).init();

    $('.products-items').slick({
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1066,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,

                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,

                }
            }
        ]
    })

    $('.reviews-items').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        slidesToShow: 1,
        slidesToScroll: 1,

        responsive: [
            {
                breakpoint: 769,
                settings: {
                    autoplay: true,

                }
            }
        ]
    })

    const menu = $("#menu");

    //Меню
    $(".burger-menu ").click(function () {
        $("menu ul li").addClass('open');
        menu.show();
        $(".close").show();

    });

    $('.menu-btn').click(function () {
        menu.css('display', 'none');
    });

    $(".close").click(function () {
        $("#menu").hide();
        $(".close").hide();

    });

    $('.rights span').text((new Date()).getFullYear());

    $('.open-popup-link').magnificPopup({
        type: 'inline',
        midClick: true
    });


    const phone = $('.phone');
    phone.inputmask({ mask: "+999 (99) 999-99-99" });

    let loader = $('.loader');
    const modalCall = $('#call-popup')
    const modalOrder = $('#order-popup')
    const form = $('form');
    const input = $('form input');
    const name = $('.name');
    const popUp = $('.popup');
    const errorInput = $('.error-input');


    $(".close-btn").click(function () {
        popUp.hide();
        $('.mfp-bg').hide();
        location.reload();
        form[0].reset();
    });

    //Модальное окно Связаться с нами
    $('.form-button').click(function (e) {
        e.preventDefault();

        let hasError = false;
        errorInput.hide();

        if (!name.val()) {
            name.next().show();
            hasError = true;
            input.css('border-color', 'red');
        }
        if (!phone.val()) {
            phone.next().show();
            hasError = true;
            input.css('border-color', 'red');
        }


        if (!hasError) {
            loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: " https://testologia.ru/checkout ",
                data: { name: name.val(), phone: phone.val() }
            })
                .done(function (msg) {
                    loader.hide();
                    $(".popup").show();
                    modalCall.hide();
                    input.css('border-color', ' ');
                    form[0].reset();
                });
        }
    })


    //Модальное окно Оформить заказ
    $('.form-order-button').click(function (e) {
        e.preventDefault();

        let hasError = false;
        errorInput.hide();

        const name2 = $('#name2');
        const phone2 = $('#phone2');
        const tea = $('#tea');

        if (!name2.val()) {
            name2.next().show();
            hasError = true;
            input.css('border-color', 'red');
        }
        if (!phone2.val()) {
            phone2.next().show();
            hasError = true;
            input.css('border-color', 'red');
        }
        if (!tea.val()) {
            tea.next().show();
            hasError = true;
            input.css('border-color', 'red');
        }

        if (!hasError) {
            loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: " https://testologia.ru/checkout ",
                data: { name: name2.val(), phone: phone2.val(), tea: tea.val() }
            })
                .done(function () {
                    loader.hide();
                    popUp.show();
                    modalOrder.hide();
                    $(input).css('border-color', '');
                    form[0].reset();
                });
        }
    })

    $("#call-me").click(function () {
        popUp.hide();
        $('.mfp-bg').hide();
        $('html, body').animate({
            scrollTop: $(".products").offset().top
        }, 2000);
    });

    const hideContent = $(".hide-content");
    const showText = $("#show-more");
    const mainBlock = $(".main-info-description");

    showText.click(function () {
        hideContent.show();
        showText.text("Скрыть текст");
        mainBlock.css('height', '790px')
        $('.advantages').addClass('advantages-class');


        showText.click(function () {
            hideContent.hide();
            showText.text("Узнать больше");
            mainBlock.css('height', '581px')
            $('.advantages').removeClass('advantages-class');
        });
    })

    $('.product-button').click((e) => {
        const productContainer = $(e.target).closest('.pr');
        const productName = productContainer.find('.product-name').text();
        const optionToSelect = $('#tea').find('option:contains(' + productName + ')');
        optionToSelect.prop('selected', true);
        $('#order-popup')[0].scrollIntoView({ behavior: 'smooth' });

    })

    $('.minus').click(function () {
        let $inp = $(this).parent().find('.product-weight-number');
        let count = parseInt($inp.val()) - 100;
        count = count < 100 ? 100 : count;
        $inp.val(count);
    });
    $('.plus').click(function () {
        let $inp = $(this).parent().find('.product-weight-number');
        $inp.val(parseInt($inp.val()) + 100);
    });

});
