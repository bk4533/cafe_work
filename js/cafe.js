$(function(){
    //검색
    $('.search-select').click(function(e){
        e.preventDefault();//a 태그의 기능을 중지 시킴
        //search-sbox.dml .display 값을 받아다가 변수 dp에 저장한다.
        const dp = $('.search-sbox').css("display")
        //dp값이 none일때와 biock일때를 구분한다
        if(dp=="none"){
            //none이라면 아래 화살표를 지우고 위에 화살표를 넣는다.
             $('.selectbox').find('.fa-solid')
                   .removeClass('fa-angle-down')
                   .addClass('fa-angle-up');
            //search-sbox를 display block으로 바꾼다.
             $('.search-sbox').show();
        }else{
            //none과 반대의 처리를 한다.
            $('.fa-solid').removeClass('fa-angle-up').addClass('fa-angle-down');
            $('.search-sbox').hide();
        }
    });

    $('.search-sbox>a').click(function(e){
        e.preventDefault();//a 태그의 기능을 중지 시킴
        const txt = $(this).text();
        $('.search-select').text(txt);
        $('.search-sbox').hide();
        $('.selectbox').find('.fa-solid')
                   .removeClass('fa-angle-up')
                   .addClass('fa-angle-down');
        $("#selectbox").val(txt);
        $('#searchtext').focus();

    });

    $('.hero li').mouseenter(function(){
       $('.hero li').removeClass('active');
       $(this).addClass('active');
    })


    //slideshow
     let slide = setInterval(mySlide,10000);
     $('.next').click(function(){
        clearInterval(slide);
        mySlide();
        slide = setInterval(mySlide,10000);
     });
     $('.prev').click(function(){
        clearInterval(slide);
        prevEvent();
        slide = setInterval(mySlide,10000);

     });
     myTime();

     //데이터 가져오기
     jQuery.ajax({
        type:"GET",
        url:"data/data.json",
        dataType:"JSON",
        success: function(data){
            let list = '';
            for(let i = 0; i < data.cafelist.length; i++){
                list += '<li><a href="#" class="d-flex align-items-center justify-content-between">';
                list +='<div class="tbox d-flex align-items-center">';
                list +='<img src="' +data.cafelist[i].img+ '" alt="' +data.cafelist[i].num+ '">';
                list +='<h1>'+data.cafelist[i].num+'</h1><p class="ellipise">'+data.cafelist[i].content+'</p></div>';
                list +='<div class="cfe d-flex"><p class="ellipise">'+data.cafelist[i].cafename+'</p>';
                list +='<p class="dg">'+data.cafelist[i].comment+'</p></div>';
                list +='</li>';

            }
            $('.clist').html(list);
        },
        error:function(xhr, status, error){
            console.log(erroe);

        }
     });
     
     $(window).on('scroll',function(){
             if($(window).scrollTop() > 2000){
                $('.angletop').fadeIn();
             }else{
                $('.angletop').fadeOut();
             }
     });
     $('.angletop').click(function(e){
        e.preventDefault();
        $('html,body').animate({
            sccollTop:'0'
        },300);
     });

});//jquery
function mySlide(){
    const eq0 =$('.hero .new:eq(0)'); //최초로 보이는 new
    const eq1 =$('.hero .new:eq(1)');// 그 뒤에 숨어 있는 new
    //animate를 통해 두 번째 new레 zindex를 추가하여 제일 앞에 보이게 하고
    //투명처리 할 후 점차 진하게 보이게 한다.
    eq1.addClass('zindex').css('opacity',0).animate({ 
        'opacity':1
    },500,function(){
        //anlmate작업이 끝나면 이전에 보였던 new의 zindex를 지우고 가장 나중으로
        //바꿔준다.
        eq1.find('li').eq(ranDomList()).addClass('active');
        eq0.removeClass('zindex');
        eq0.find('li').removeClass('active');
        $('.hero').append(eq0);
    });
}
// function myBackSlide(){
//     const eq0 =$('.hero .new:eq(0)');
//     const eq4 =$('.hero .new:eq(4)');
//     eq4.addClass('zindex').css('opcity',0).animate({
//         'opcity':4
//     },500,function(){

//     });
// }

function ranDomList(){
    return Math.floor(Math.random() * 4);
}
function prevEvent(){
  $('.new:first-child').removeClass("zindex");
  $('.new:last-child').addClass('zindex').clone().prependTo('.hero');
  $('.new:last-child').remove();
}

function myTime(){
    let dt = new Date();
   let y = dt.getFullYear();
   let m = dt.getMonth();
   let d =dt.getDate();
   let h = dt.getHours();
   let mm = dt.getMinutes();
   let mt =`${y}.${m}.${d}.<strong>${h}.${mm}.</strong>`;
   $('.thetime').html(mt);
}