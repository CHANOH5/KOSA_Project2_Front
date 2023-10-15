
$(()=>{
    const backURL = 'http://localhost:8888/KOSA_Project2'
    const frontURL = 'http://localhost:5500/HTML'
    const urlParams = new URL(location.href).searchParams
    const teamNo = urlParams.get('teamNo')
    const noticeNo = urlParams.get('noticeNo')


    $.ajax({
        url: backURL+'/noticedetail',
        method : 'get',
        data : `teamNo=${teamNo}&noticeNo=${noticeNo}`,
        success: (responseJSONObj)=>{
            if(responseJSONObj.memStatus == 0){
                $('div.noticedetail>div.setmainbutton>button').hide()
                $('div.noticedetail>div.detailbuttons>button.edit').hide()
                $('div.noticedetail>div.detailbuttons>button.remove').hide()
            }
            const noticeTitle = responseJSONObj.notice.noticeTitle
            const noticeContent = responseJSONObj.notice.noticeContent
            const regDate = responseJSONObj.notice.regDate

            if(responseJSONObj.fileName == 'null'){
                $('div.filezone').hide()
            }else{
                $('div.filezone>span').text(responseJSONObj.fileName)
            }
    
            $('div.detailtitleline>h4').html(noticeTitle)
            $('div.detailtitleline>span').text(regDate)
            $('div.detailcontent>p').html(noticeContent)
        },
        error:(jqXHR, textStatus)=>{
            Swal.fire({
                icon: 'warning',
                text: '다시 한번 시도해주세요🙏'
            })
            console.log(jqXHR)
        }
    })


    // ---- 메인공지 등록 클릭 시 발생 이벤트 ----
    $('div.noticedetail>div.setmainbutton>button').on('click',(e)=>{
        $.ajax({
            url: backURL+'/setmainnotice',
            method : 'get',
            data : `teamNo=${teamNo}&noticeNo=${noticeNo}&mainStatus=1`,
            success: (responseJSONObj)=>{
                if(responseJSONObj.status==1){
                    Swal.fire({
                        icon: 'success',
                        text: responseJSONObj.msg
                      }).then((result) => {
                        if (result.isConfirmed) location.href=`${frontURL}/notice.html?teamNo=${teamNo}`
                      })
                    // location.href=`${frontURL}/notice.html?teamNo=${teamNo}`
                }else{
                    Swal.fire({
                        icon: 'warning',
                        text: responseJSONObj.msg
                      })
                }
            },
            error:(jqXHR, textStatus)=>{
                Swal.fire({
                    icon: 'warning',
                    text: '다시 한번 시도해주세요🙏'
                })
                console.log(jqXHR)
            }
        })
    })

    //---- 파일명 클릭 시 발생 이벤트 ----
    $('div.filezone>span').click((e)=>{
        alert('눌렸으')
        $.ajax({
            xhrFields: {
                responseType: "blob",
            },
            url: backURL+'/noticefiledownload',
            method: 'get',
            contentType: false, //파일첨부용 프로퍼티
            processData : false, //파일첨부용 프로퍼티
            data: `teamNo=${teamNo}&noticeNo=${noticeNo}`,
            success: (responseData)=>{
                console.log(responseData)
                console.log(responseData.URL)
                // if(responseData.size > 0){
                //     const imgurl = URL.createObjectURL(responseData)
                //     $('form.imgbox>img').attr('src', imgurl)
                // }
                location.href = `http://localhost:8888/KOSA_Project2/noticefiledownload?teamNo=${teamNo}&noticeNo=${noticeNo}`
                Swal.fire({
                    icon: 'success',
                    text: '다운로드 성공하였습니다'
                })
            },
            error: (jqxhr)=>{
                Swal.fire({
                    icon: 'warning',
                    text: '다시 한번 시도해주세요🙏'
                })
            }
        })
    })

    //---- 수정버튼 클릭 시 발생 이벤트 ----
    $('div.noticedetail>div.detailbuttons>button.edit').on('click',(e)=>{
        $('div.noticedetail').hide()
        $('div.editnotice').show()

        $.ajax({
            url: backURL+'/noticedetail',
            method : 'get',
            data : `teamNo=${teamNo}&noticeNo=${noticeNo}`,
            success: (responseJSONObj)=>{
                const noticeTitle = responseJSONObj.notice.noticeTitle
                const noticeContent = responseJSONObj.notice.noticeContent
                const mainStatus = responseJSONObj.notice.mainStatus

                console.log(noticeTitle)

                if(responseJSONObj.fileName == 'null'){
                    $('div.modifyfilezone').hide()
                }else{
                    $('div.modifyfilezone>span').text(responseJSONObj.fileName)
                }
                
                $('div.mainnotice>input[name=status]').attr('value',mainStatus);
                $('div.modifytitleline>input[name=title]').attr('value',noticeTitle);
                $('div.modifycontent>textarea[name=content]').html(noticeContent);
            },
            error:(jqXHR, textStatus)=>{
                Swal.fire({
                    icon: 'warning',
                    text: '다시 한번 시도해주세요🙏'
                })
                console.log(jqXHR)
            }
        })
    })

    //---- 완료버튼 클릭 시 발생 이벤트 ----
    $('div.editnotice>form>div.writebuttons>button[type=submit]').on('click',(e)=>{
        const $formObj = $('form')

        $formObj.submit((e) => {
            const fd = new FormData(e.target)
            fd.append("teamNo", teamNo)
            fd.append("noticeNo", noticeNo)

            $.ajax({
                xhrFields:{
                withCredentials : true
                },
                url: `${backURL}/editnotice`,
                method : 'post',
                contentType: false, //파일첨부용 프로퍼티
                processData : false, //파일첨부용 프로퍼티
                data : fd,
                success : (responseJSONObj)=>{
                    if(responseJSONObj.mainStatus==1 && responseJSONObj.status==1){
                        Swal.fire({
                            icon: 'success',
                            text: responseJSONObj.msg
                        })
                        location.href=`${frontURL}/notice.html?teamNo=${teamNo}`
                    }else if(responseJSONObj.mainStatus==0){
                        Swal.fire({
                            icon: 'warning',
                            text: responseJSONObj.mainmsg
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

    //---- 취소버튼 클릭 시 발생 이벤트 ----
    $('div.editnotice>div.backbutton>button[name=back]').on('click',(e)=>{
        const state = {'teamNo':teamNo, 'noticeNo':noticeNo}
        location.href=`${frontURL}/noticedetail.html?teamNo=${teamNo}&noticeNo=${noticeNo}`
    })

    //---- 삭제버튼 클릭 시 발생 이벤트 ----
    $('div.noticedetail>div.detailbuttons>button.remove').on('click',(e)=>{
        var result = confirm("삭제하시겠습니까?")
        if(result == true){
            $.ajax({
                url: backURL+'/deletenotice',
                method : 'get',
                data : `teamNo=${teamNo}&noticeNo=${noticeNo}`,
                success: (responseJSONObj)=>{
                    if(responseJSONObj.status==1){
                        Swal.fire({
                            icon: 'success',
                            text: responseJSONObj.msg
                        })
                        location.href=`${frontURL}/notice.html?teamNo=${teamNo}`
                    }else{
                        alert(responseJSONObj.msg)
                    }
                },
                error:(jqXHR)=>{
                    Swal.fire({
                        icon: 'warning',
                        text: '다시 한번 시도해주세요🙏'
                    })
                    console.log(jqXHR)
                }
            })
        }else{
            return false
        }
        return false
    })


})
