$(function () {

    $('.burger-btn').on('click', function () {
        $('.burger-btn').toggleClass('burger-btn--active');
        $('.menu').toggleClass('menu--active');
    });
    $('.menu__link').on('click', function () {
        $('.burger-btn').removeClass('burger-btn--active');
        $('.menu').removeClass('menu--active');
    });

    if (window.innerWidth < 992) {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 6100) {
                $('.header').fadeOut();
            } else {
                $('.header').fadeIn();
            }
        });
    }

    if (window.innerWidth > 992) {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 6200) {
                $('.menu').fadeOut();
            } else {
                $('.menu').fadeIn();
            }
        });
    }

    $("a[href^='#']").click(function () {
        const href = $(this).attr("href");
        $("html, body").animate({ scrollTop: $(href).offset().top + "px" });
        return false;
    });

    $.validator.addMethod("minlenghtphone", function (value, element) {
        return value.replace(/\D+/g, '').length > 10;
    });
    $.validator.addMethod("requiredphone", function (value, element) {
        return value.replace(/\D+/g, '').length > 1;
    });


    function validateForms(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: {
                    requiredphone: true,
                    minlenghtphone: true,
                },
                email: "required",
            },
        });
    }

    validateForms('.registration-form');


    $('form').submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "send.php",
            data: $(this).serialize(),
        });
        $('.registration-form__input').removeClass('valid');
        $(this).find('button[type="submit"]').prop('disabled', true);
        $(this).find("input").val("");
        $('form').trigger('reset');
        return false;
    });

    $("input[name=phone]").mask("+7 (999) 999-99-99");

    $('input').on('change', function () {
        if ($('.promo__form-input').val() !== '' && $('input[name="user-agreement"]').is(':checked')) {
            $(this).closest('form').find('button[type="submit"]').prop('disabled', false);
        } else {
            $(this).closest('form').find('button[type="submit"]').prop('disabled', true);
        }
    });
});



