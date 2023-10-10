const backURL = 'http://127.0.0.1:8888/KOSA_TeamTrack_Back'
const frontURL = 'http://127.0.0.1:5500/HTML'
$(() => {

        $.ajax({
            url: backURL+ '/main',
            method: 'get',
            data: 'currentPage=1&column=viewCnt',
            success: (responseJSONObj) => {
    
                const status = responseJSONObj.status
                const list = responseJSONObj.list
                const hashlist = responseJSONObj.hashlist
                
                //원본 product객체찾기
                const $originNewTeam = $('div.mainteam>div.topteam').first()
                //$originProduct.parent().children().not($originProduct)
                $originNewTeam.siblings().remove() //productlist영역 초기화
                $originNewTeam.show()
                
                $(list).each((index, t) => {
                    //복제본 product객체생성
                    const $copyNewTeam = $originNewTeam.clone()
                    const teamName = t.teamName
                    const studyType = t.studyType
                    const onOffLine = t.onOffLine
                    const joinMember = t.joinMember 
                    const maxMember = t.maxMember 
                    const createDate = t.createDate
                    const startDate = t.startDate 
                    const endDate = t.endDate 
                    const teamNo = t.teamNo
                    const briefInfo = t.briefInfo
                    const viewCnt = t.viewCnt
                    const hashtags = [];
        
                    $(hashlist).each((index, h) => {
                        const hashtag = h.hashtagName
                        const teamNo2 = h.teamNo
                        if(teamNo2==teamNo){
                            hashtags.push(hashtag)
                        }
                    })
                    console.log(hashtags)
                    const hashtag1 = hashtags[0]
                    const hashtag2 = hashtags[1]
                    const hashtag3 = hashtags[2]
                    const hashtag4 = hashtags[3]
                    const hashtag5 = hashtags[4]
        
                    //$copyTopTeam.find("ul>li>img").attr('src', '../images/' + prodNo + '.jpg').attr("alt", prodName)
                    $copyNewTeam.find("ul>li>span.teamName").html(teamName)
                    $copyNewTeam.find("ul>li>span.studyType").html(studyType)
                    $copyNewTeam.find("ul>li>span.onOffLine").html(onOffLine)
                    $copyNewTeam.find("ul>li>span.joinMember").html(joinMember)
                    $copyNewTeam.find("ul>li>span.maxMember").html(maxMember)
                    $copyNewTeam.find("ul>li>span.createDate").html(createDate)
                    $copyNewTeam.find("ul>li>span.startDate").html(startDate)
                    $copyNewTeam.find("ul>li>span.endDate").html(endDate)
                    $copyNewTeam.find("ul>li>span.hashtag1").html(hashtag1)
                    $copyNewTeam.find("ul>li>span.hashtag2").html(hashtag2)
                    $copyNewTeam.find("ul>li>span.hashtag3").html(hashtag3)
                    $copyNewTeam.find("ul>li>span.hashtag4").html(hashtag4)
                    $copyNewTeam.find("ul>li>span.hashtag5").html(hashtag5)
                    $copyNewTeam.find("ul>li>span.briefInfo").html(briefInfo)
                    $copyNewTeam.find("ul>li>span.viewcnt").html(viewCnt)
                    console.log($copyNewTeam.find("ul>li>span.viewcnt").html(viewCnt))
                    //복제본객체를 .productlist객체의 자식으로 추가
                    $('div.mainteam').append($copyNewTeam)
                })
                $originNewTeam.hide()
            },
            error: () => {
   
            }
        })
       
        const $button = $('button.more')

        $button.click(() => {
            location.href = "./topteamlist.html"
        })
    
    })



