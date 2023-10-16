
$(()=>{
    const backURL = 'http://192.168.1.20:8888/teamtrack'
    const frontURL = 'http://192.168.1.20:5500/HTML'

    
    //---- 확인버튼 클릭 시 발생 이벤트 ----
    $('form.agree').submit((e)=>{
        $.ajax({
            xhrFields:{
                withCredentials : true
            },
            url: `${backURL}/deleteaccount`,
            method : 'post',
            data : $('form.agree').serialize(),
            success : (responseJSONObj)=>{
                console.log(responseJSONObj)
                if(responseJSONObj.status==1){
                    Swal.fire({
                        icon: 'success',
                        text: responseJSONObj.msg
                    }).then(result=>{
                        location.href=`${frontURL}/Intro.html`
                    })
                    
                }else{
                    Swal.fire({
                        icon: 'error',
                        text: '다시 한번 시도해주세요🙏'
                    })
                }
            },
            error: (jqxhr)=>{
                Swal.fire({
                    icon: 'error',
                    text: '다시 한번 시도해주세요🙏'
                })
            }
        })
        return false
    })


})
