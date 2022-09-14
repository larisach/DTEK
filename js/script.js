function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {

    if (support == true) {
        document.querySelector('body').classList.add('webp');
    }else{
        document.querySelector('body').classList.add('no-webp');
    }
});

$(document).ready(function () {
    $('.menu__icon, .menu__name').on('click', function () {
        $('.menu__body').addClass('active');
    });

    $('.menu__close').on('click', function () {
        $('input.form__input').val('');
        $('form.form').trigger('reset');
        $('.menu__body').removeClass('active');
    });

    if ($('.select-project__main-text').height() > 312) {
        $('.select-project__main-text').toggleClass('hide');
        $('.read-more').toggleClass('hide').toggleClass('show');
    }

    $('.select-project__read').on('click', $('.read-more'), function (e) {
        e.preventDefault();
        $('.select-project__main-text').toggleClass('hide');
        $('.read-more').toggleClass('read-more_open');
    });

    $('.select__header').on('click', function (e) {
        e.preventDefault();

        var element = $(this)
            .closest('.dropdown')
            .find('.select__container');
        $('.select__container').not(element).removeClass('active');
        element.toggleClass('active');

        var arrow = $(this)
            .closest('.dropdown')
            .find('.select__header');
        $('.select__header').not(arrow).removeClass('select__header-open');
        arrow.toggleClass('select__header-open');
    });

    $.each($('.select__item'), function () {
        $(this).on('click', function () {
            var select = $(this)
                .closest('.dropdown')
                .find('.select__header');

            select.text($(this).children('label').text());
            select.removeClass().addClass('select__header select__header_font');
            $('.select__container').removeClass('active');
            $(this).children('input').prop('checked', true);
        });
    });

    if ($('#newsSlider').length > 0) {
        new Swiper('#newsSlider', {
            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar'
            },
            preloadImages: false,
            lazy: {
                loadOnTransitionStart: false,
                loadPrevNext: true
            }
        });
    }

    if ($('#investmentSlider').length > 0) {
        var heightSlider = $('.slider-wrapper').height();
        $('.slider-wrapper li').height(heightSlider);
        new Swiper('#investmentSlider', {
            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar'
            },
            breakpoints: {
                480: {
                    slidesPerView: 1
                },
                680: {
                    slidesPerView: 2
                },
                992: {
                    slidesPerView: 5
                }
            }
        });
    }

    $('#datepicker, #datepicker-1, #datepicker-2, #datepicker-3').datepicker({
        dateFormat: 'dd-mm-yy',
        prevText: "",
        nextText: "",
        currentText: "",
        firstDay: 1,
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        dayNamesMin: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    });

    $('.list__container').on('click', '.list__link', function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });


    $('.phone-field').inputmask("+38 099 999 99 99");
    $.validator.addMethod("checkMaskPhone", function (value, element) {
        return /\+\d{2} \d{3} \d{3} \d{2} \d{2}/g.test(value);
    });

    $('.email-field').inputmask({
        mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
        greedy: false
    });

    var canvas = $("#chart-social-report");
    var myBarChart = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: [["Повышение", "активности громад"], ["Энергоэффективность"]],
            datasets: [{
                data: [250000, 1312319],
                backgroundColor: [
                    'rgba(133, 197, 227, 1)',
                    'rgba(133, 197, 227, 1)'
                ],
                lineTension: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,

            hover: {
                animationDuration: 0
            },
            animation: {
                easing: 'easeInOutQuad',
                duration: 1,
                "onComplete": function () {
                    var chartInstance = this.chart,
                        ctx = chartInstance.ctx;

                    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';

                    this.data.datasets.forEach(function (dataset, i) {
                        var meta = chartInstance.controller.getDatasetMeta(i);
                        meta.data.forEach(function (bar, index) {
                            var data = dataset.data[index];
                            ctx.fillText(data, bar._model.x, bar._model.y + 25);
                        });
                    });
                }

            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var value = data.datasets[0].data[tooltipItem.index];
                        if (parseInt(value) >= 1000) {
                            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        } else {
                            return value;
                        }
                    }
                }
            },
            legend: {
                display: false
            },
            title: {
                display: true,
                fontSize: 18,
                fontColor: "#000000",
                fontStyle: "bold",
                text: 'Отчет по социальным инвестициям'
            },
            scales: {
                yAxes: [{
                    gridLines: {
                        display: false
                    },

                    scaleLabel: {
                        display: true,
                        fontSize: 16,
                        fontColor: "#000000",
                        fontStyle: "bold",
                        labelString: 'Социальные инвестиции, грн'
                    },
                    ticks: {
                        fontColor: "#000000",
                        fontSize: 12,
                        beginAtZero: true,
                        stepSize: 200000,
                        min: 0,
                        max: 1600000,
                        callback: function (value, index, values) {
                            if (parseInt(value) >= 1000) {
                                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            } else {
                                return value;
                            }
                        }
                    }
                }],
                xAxes: [{}]
            }
        }
    });


    $('#form-inform').on('click', 'button[type=submit]', function (e) {
        e.preventDefault();
        $num = 0;
        if ($('#form-inform input[type=text]').length > 0) {
            $("#form-inform input[type=text]").each(function () {
                var value = $(this).val().replace(/^\s+|\s+$/g, '');
                if (value.length < 1) {
                    $(this).parent().addClass("error");
                } else {
                    $(this).parent().removeClass("error");
                }
            });
        }

        if ($('#form-inform input[type=tel]').length > 0) {
            $("#form-inform input[type=tel]").each(function () {
                var value = $(this).val().replace(/^\s+|\s+$/g, '');
                if (value.length < 1) {
                    $(this).parent().addClass("error");
                } else {
                    $(this).parent().removeClass("error");
                }
            });
        }

        if ($('#form-inform textarea').length > 0) {
            $("#form-inform textarea").each(function () {
                var value = $(this).val().replace(/^\s+|\s+$/g, '');
                if (value.length < 1) {
                    $(this).parent().addClass("error");
                } else {
                    $(this).parent().removeClass("error");
                }
            });
        }
        if ($('#form-inform .select').length > 0) {
            $("#form-inform .select").each(function () {
                var select = $(this).find('.select__header');
                if (!select.hasClass('select__header_font')) {
                    $(this).addClass("error");
                } else {
                    $(this).removeClass("error");
                }
            });
        }
        $('#form-inform *').filter('.block-form-input, .block-form-textarea, .dropdown__select').each(function () {
            if ($(this).hasClass('error')) {
                $num++;
            }
        });

        if ($num == 0) {
            $("#form-inform ").submit();
        }
    });

    //countdown
    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes
        };
    }
    function initializeClock(id, endtime) {
        function updateClock() {
            var t = getTimeRemaining(endtime);

            $('.hours-first').html(Math.floor((('0' + t.hours).slice(-2))/10)%10);
            $('.hours-second').html((('0' + t.hours).slice(-2))%10);
            $('.minutes-first').html(Math.floor(('0' + t.minutes)/10)%10);
            $('.minutes-second').html(('0' + t.minutes)%10);
            if ( t.days < 10) {
                $('.days-first').html('0');
                $('.days-second').html(t.days)
            } else {
                $('.days-first').html(Math.floor((t.days)/10)%10);
                $('.days-second').html((t.days)%10);
            }

            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }
        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
    }

    var deadline=$('#countdown').data('deadline');
    initializeClock('countdown', deadline);
});

$(document).mouseup(function (e) {
    if ($('.menu__body').has(e.target).length === 0 && !$('.menu__icon, .menu__name').is(e.target)) {
        $('input.form__input').val('');
        $('form.form').trigger('reset');
        $('.menu__body').removeClass('active');
    }
});
