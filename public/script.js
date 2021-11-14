$(document).ready(function () {
    $("#submit").submit(function (event) {
        event.preventDefault()
        let username = $("#username").val()
        $(".tweet-item").remove();
        $.ajax({
            type: "GET",
            url: `https://os-socket-server.herokuapp.com/api/tweets/${username}`,
            datatype: "json",
            success: function (res) {
                console.log(res)
                let gridArr = [];
                $.each(res.data, function (key, value) {
                    let url = undefined;
                    if (value.attachments) {
                        url = res.includes.media.find((media) => value.attachments.media_keys[0] == media.media_key).url;
                    }
                    $item = $("<div class='tweet-item'></div>").append(
                        $("<div class='card'></div>").append(function () {
                            let outer = $("<div></div>");
                            if (url && url != "") {
                                outer.append(
                                    $(`<img src='${url}' class='card-img-top'>`)
                                )
                            }
                            let cardBody = $(`<div class='card-body'></div>`)
                            cardBody.append($(`<p class='card-text'>${value.text}</p>`))
                            cardBody.append(
                                $(`<div class = "buttons"><div><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.5 2.82501C14.76 2.82501 13.09 3.63501 12 4.91501C10.91 3.63501 9.24 2.82501 7.5 2.82501C4.42 2.82501 2 5.24501 2 8.32501C2 12.105 5.4 15.185 10.55 19.865L12 21.175L13.45 19.855C18.6 15.185 22 12.105 22 8.32501C22 5.24501 19.58 2.82501 16.5 2.82501ZM12.1 18.375L12 18.475L11.9 18.375C7.14 14.065 4 11.215 4 8.32501C4 6.32501 5.5 4.82501 7.5 4.82501C9.04 4.82501 10.54 5.81501 11.07 7.18501H12.94C13.46 5.81501 14.96 4.82501 16.5 4.82501C18.5 4.82501 20 6.32501 20 8.32501C20 11.215 16.86 14.065 12.1 18.375Z" fill="black"/>
                                </svg>
                                ${value.public_metrics.like_count}
                                </div>
                                <div>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 8.5V4.5L3 11.5L10 18.5V14.4C15 14.4 18.5 16 21 19.5C20 14.5 17 9.5 10 8.5Z" fill="black"/>
                                </svg>
                                ${value.public_metrics.reply_count}
                                </div>
                                <div>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 6V2L7 7L12 12V8C15.31 8 18 10.69 18 14C18 17.31 15.31 20 12 20C8.69 20 6 17.31 6 14H4C4 18.42 7.58 22 12 22C16.42 22 20 18.42 20 14C20 9.58 16.42 6 12 6Z" fill="black"/>
                                </svg>
                                ${value.public_metrics.retweet_count}
                                </div>
                                </div>
                                `)
                            )
                            outer.append(cardBody);
                            return outer;
                        }
                        )
                    )
                    gridArr.push($item);
                })
                // for (item of gridArr) {
                //     $grid.append(item).masonry('appended', item)
                // }
                $("#tweets").append(gridArr)
            }
        })
    })
})
