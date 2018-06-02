$(document).ready(function () {
    location1 = "https://192.168.0.107:8080/hmi";
    /*-------------------------- Current Time Function Start --------------------------*/
    var msg;
    chatDate = new Date();

    currentTime = function () {
        var date = new Date();
        var hours = date.getHours();
        if (hours < 12)
            msg = "Good Morning";
        else if (hours < 18)
            msg = "Good Afternoon";
        else
            msg = "Good Evening";
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'

        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    currentTime();

    /*-------------------------- Current Time Function End --------------------------*/

    /*------------------ Login Start -------------------*/

    $(".chat-wrapper").hide();
    $('.ip-adress').hide();
    $('.toggle').click(function () {
        $('.ip-adress').slideToggle();
    });

    /*-------- Login Input focus start ------------------*/
    $(".input").focusin(function () {
        $(this).find("span").animate({
            "opacity": "0"
        }, 200);
    });

    $(".input").focusout(function () {
        $(this).find("span").animate({
            "opacity": "1"
        }, 300);
    });
    /*-------- Login Input focus End ------------------*/

    /*----- Global variable-----*/
    var password, passwordValid, ipAddress, isUserNameExistInDb, locationAauthenticateUser, locationUpdateUser, checkAuthenticUser;
    /*-------- Login Button Function Start ------------------*/

    // $("#UpdatePasswordForm, #welcome-wrapper, #home-wrapper").hide();

    /*----------- Btn Login click Start ---------------*/
    $("#login").click(function (e) {
        validateLoginForm();
    });
    $('#password').keydown(function (e) {
        if (e.keyCode == 13) {
            //login.click();
            validateLoginForm();
        }
    });
    /*----------- Btn Login click End ---------------*/

    $(".validate").keyup(function (e) {
        $(this).parent().parent().removeClass('login-error');
    });

    /*----------- Btn Update click Start ---------------*/
    $("#btnUpdate").click(function (e) {
        validateUpdatePassword();
    });
    $('#confirmPassword').keydown(function (e) {
        if (e.keyCode == 13) {
            //login.click();
            validateUpdatePassword();
        }
    });
    /*----------- Btn Update click End ---------------*/


    /*-------------------------- Initial Post Call Function Start ---------------------*/
    function initialCall() {
        //console.log(location1);
        $(".chat-wrapper").show();
        $("#home-wrapper").fadeIn("fast");
        $.post(location1 + "/bot", {
                user: "John"
            }, function (data, textStatus, jqXHR) {
                console.log(data);
                currentTime();
                systemUtteranceContent = '<li class="mar-btm systemUtterance"> <div class="media-body pad-hor"> <div class="speech"> <p id="systemUtterance">' + msg + ', ' + data.result.reply + '</p><p class="speech-time"><i class="fa fa-clock-o fa-fw"></i>' + currentTime() + '</p> </div></div></li>';
                $('#loading').hide();
                $("#utterance").html(systemUtteranceContent);
                $("#utterance li:hidden:first")
                    .fadeIn(600);

                locationInt = jqXHR.getResponseHeader("location");
                //console.log(locationInt);
                getCurrentTask();

                if (cardsFlag == true) {
                    subscribeList();
                }
                //languageChangeHandler();
            })
            .fail(function (xhRequest, status, thrownError) {
                showError("Initialisation failed.", true);
                alert(thrownError);
            });
    }
    initialCall();
    /*-------------------------- Initial Post Call Function End --------------------------*/

    $('.alert-msg').hide();

    function showMessage(msg, status) {
        $('.alert-msg').animate({
            height: "toggle",
            opacity: "toggle"
        }, "slow").delay(3500).animate({
            height: "toggle",
            opacity: "toggle"
        }, "slow");
        if (status == 'success') {
            $('.alert-msg').addClass('alert-success');
            $('.alert-msg').removeClass('alert-danger');
            $('.alert-msg').text(msg);
            return false;
        } else {
            $('.alert-msg').addClass('alert-danger');
            $('.alert-msg').removeClass('alert-success');
            $('.alert-msg').text(msg);
            return false;
        }

    }
    /*-------- Login Button Function End ------------------*/

    /*-------------- Get Current task Start-----------------*/
    getCurrentTask = function () {
        //alert('get current task..');
        $('#current-task-detail').empty();
        $.post(locationInt + '/tasks',
            function (data) {
                //console.log(data);
                var CardHtmlData = '';
                var taskHtml = '';
                var navTab = '';
                var tabContent = '';
                $.each(data.tasks, function (i, objValue) {
                    var itos = '';
                    $.each(objValue.entities, function (key, value) {
                        var taskLabel;
                        if (value.label === '') {
                            taskLabel = value.name;
                        } else {
                            taskLabel = value.label;
                        }
                        itos += '<div class="col-xs-4"><label>' + taskLabel + ': <span>' + value.value + '</span></label></div>';
                    });

                    var tabTitle;
                    if (objValue.label === '') {
                        tabTitle = objValue.name;
                    } else {
                        tabTitle = objValue.label;
                    }

                    navTab += '<li><a data-toggle="tab" href="#' + i + '">' + tabTitle + '</a></li>';
                    tabContent += '<div id="' + i + '" class="tab-pane fade">' + itos + '</div>';
                    taskHtml = '<ul class="nav nav-tabs">' + navTab + '</ul><div class="tab-content col-xs-12 marginTop">' + tabContent + '</div>'
                });
                $('#task-wrapper').html(taskHtml);
            }

        ).done(function () {
            $('#task-wrapper .nav-tabs li:first-child').addClass('active');
            $('#task-wrapper .tab-content .tab-pane:first-child').addClass('active in');
        });

    }
    /*-------------- Get Current task End-----------------*/

    /*--------- Cards animation start ---------------*/

    $(document).on('click', 'div.card', function () {
        $(this).fadeOut(400, 'swing', function () {
            return $(this).appendTo('.card-container').hide();
        }).fadeIn(400, 'swing');
    });

    /*--------- Cards animation end ---------------*/


    /*------------------------ Custom scroll start --------------------*/
    (function ($) {
        $(window).on("load", function () {
            $("#scroll-wrap").mCustomScrollbar({
                autoHideScrollbar: true,
                //theme:"rounded"
                theme: "minimal-dark"
            });
        });
    })(jQuery);
    /*------------------------ Custom scroll End --------------------*/

});
