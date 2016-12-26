$(function(){
    // ユーザー検索（インクリメンタルサーチ）
    function usersSearchForJoin(data){
        var html =
            "<div class = 'chat-group-user clearfix'>" +
            "<input name = 'chat_group[user_ids][]' type='hidden'>" +
            "<p class = 'chat-group-user__name'>" + data.name + "</p>" +
            "<a style = 'color: deepskyblue;' id = 'add-user-button' " +
                "class = 'user-search-add chat-group-user__button chat-group-user__button-add' data-user-id='" +
                    data.id + "' data-user-name= '" + data.name + "'>" + "追加" + "</a>" + "</div>";

        $('#user-search-result').append(html);
    }

    // 追加されたユーザーを削除
    function deleteAddedMember(user_info){
        var user_name = user_info.data('user-name');
        var user_id = user_info.data('user-id');
        console.log(user_id);
        var html =
            "<div class = 'chat-group-user clearfix'>" +
            "<input name = 'chat_group[user_ids][]' value =" +  user_id + " type = 'hidden' id = 'chat-group-ids'>" +
            "<p class = 'chat-group-user__name'>" + user_name + "</p>" +
            "<a style = 'color: red;' id = 'delete-user-button' " +
                "class = 'user-search-add chat-group-user__button chat-group-user__button--add delete-user' data-user-id='" + user_id +
            "' data-user-name='" + user_name + "'>" + "削除"+ "</a>" + "</div>";
        $('#chat-group-users').append(html);
    }

    // メンバー追加
    $('#user-search-result').on('click', '#add-user-button', function(){
        var user_info = $(this);
        user_info.parent().remove();
        deleteAddedMember(user_info);
    });

    // メンバー削除
    // 参考URLhttp://www.websuppli.com/javascript/25/
    $(document).on('click', '#delete-user-button', function(){
        $(this).remove();
    });


    // 検索結果リスト
    $('#user-search-field').on('click', displayUsers);


    // 非同期通信
    function displayUsers() {
        //'users.json'指定
        $.ajax('/users.json', {
            //'users.json'の情報をゲット
            method: 'GET',
             //jsonのなかで、emailカラムを見ているってことか？（要勉強)
             //idがuser-search-fieldのinputから、取得
            data: {
                name: $('#user-search-field').val()
            },
            dataType: 'json'
        })
        // ・ステータスコードは正常で、dataTypeで定義したようにパース出来たとき
        .done(function(json){
            $('#user-search-field').children().remove();
            var insertHtml = '';
            $.each(json, function(i, data){
                insertHtml = usersSearchForJoin(data);
            });
            // json.forEach(function(user){
            //     insertHtml = usersSearchForJoin(user);
            // });
            $('#user-search-result').html(insertHtml);
        })
        // ・サーバからステータスコード400以上が返ってきたとき
        // ・ステータスコードは正常だが、dataTypeで定義したようにパース出来なかったとき
        // ・通信に失敗したとき
        .fail(function(){
            alert('エラー発生');
        })
    }

});



//jQueryを書くのは、本当に初めてで、あとで見て、わけわからなくなるので、chatspaceが完成するまで、丁寧にコメントを入れていく。
// http://qiita.com/mpyw/items/62e6e415f86eb30a5ff4 - jQueryからPHPのAPIを利用する。

// shorthand for
// $(document).ready(function()(
// ));
// $(function(){
//
//     // ユーザー検索(インクリメンタルサーチ)
//     function usersSearch() {
//         //'users.json'指定
//         $.ajax('/users.json', {
//             //'users.json'の情報をゲット
//             method: 'GET',
//              //jsonのなかで、emailカラムを見ているってことか？（要勉強)
//              //idがuser-search-fieldのinputから、取得
//             data: {
//                 name: $('#user-search-field').val()
//             },
//             dataType: 'json'
//         })
//         // ・ステータスコードは正常で、dataTypeで定義したようにパース出来たとき
//         .done(function(json){
//             var insertHtml = '';
//             json.forEach(function(user){
//                 insertHtml += buildAddUserHTML(user);
//             });
//             $('#user-search-result').html(insertHtml);
//         })
//         // ・サーバからステータスコード400以上が返ってきたとき
//         // ・ステータスコードは正常だが、dataTypeで定義したようにパース出来なかったとき
//         // ・通信に失敗したとき
//         .fail(function(){
//             alert('エラー発生');
//         })
//     }
//
//     // ユーザー検索
//     // idがuser-search-fieldのところが、
//     //  change = フォーカスが外れたときに発生する
//     //  keyupはカーソル移動や全角・半角の切り替えなどすべてのキー操作を拾う
//     //　userSearch関数を起こす。
//     $('#user-search-field').on('change keyup', usersSearch);
//
//
//     // 結果をidがuser-search-fieldに出していく。
//     // idがuser-search-resultのところで、
//     // clickされたとき、
//     // 定義された関数を起こす。
//
//     //https://w3g.jp/blog/jquery-data-attr-cache jQueryでdata取得
//     //　http://www.jquerystudy.info/tutorial/basic/this2.html - jQuery入門講座 使い方 -thisについて
//     //
//     // $(this)は、イベントが発生した要素のid属性の値を取得するもの
//     // var $this = $(this);
//     //      var id = $this.data('userId');
//     //      buildAddHTMl関数で、'<div id="chat-group-user-' + id +  '">' と加えるので、それで、userIdを取得。
//
//     $('#user-search-result').on('click', '.user-search-add', function(){
//         var $this = $(this);
//         var id = $this.data('userId');
//         var name = $this.data('userName');
//
//         var insertHTML = buildDeleteUserHTML(id, name);
//
//         // appendは追加
//         $('#chat-group-users').append(insertHTML);
//
//         // removeは削除
//         $this.parent('.chat-group-user').remove();
//     });
//
//     $('#chat-group-users').on('click', '.user-search-remove', function(){
//         var $this = $(this);
//         var id = $this.data('userId');
//
//         // フォームからユーザー削除
//         $('#chat-group-user-' + id).remove();
//     });
//
//     // 今後、userのidを渡さないといけないので、htmlのタグを一気に入れるため、関数にする。
//     function buildAddUserHTML(user) {
//         var html =
//             '<div>' +
//             '<p>' +
//             user.name +
//             '</p>' +
//             '<a class="user-search-add" ' +
//                     'data-user-id="' + user.id + '" data-user-name="' + user.name + '">追加' +
//             '</a>' +
//             '</div>';
//         return html
//     }
//
//     //　今度は、削除する関数
//     function buildDeleteUserHTML(id, name) {
//         var html =
//             '<div id="chat-group-user-' + id +  '">' +
//             '<input type="hidden" name="chat_group[user_ids][]" value="' + id + '">' +
//             '<p class="chat-group-user">' +
//             name +
//             '</p>' +
//             '<a class="user-search-remove" data-user-id="' + id + '">削除' +
//             '</a>' +
//             '</div>';
//         return html
//     }
// });




/// ------

// //jQueryを書くのは、本当に初めてで、あとで見て、わけわからなくなるので、chatspaceが完成するまで、丁寧にコメントを入れていく。
// // http://qiita.com/mpyw/items/62e6e415f86eb30a5ff4 - jQueryからPHPのAPIを利用する。
//
// // shorthand for
// // $(document).ready(function()(
// // ));
// $(function(){
//
//     // ユーザー検索(インクリメンタルサーチ)
//     function usersSearch() {
//         //'users.json'指定
//         $.ajax('/users.json', {
//             //'users.json'の情報をゲット
//             method: 'GET',
//              //jsonのなかで、emailカラムを見ているってことか？（要勉強)
//              //idがuser-search-fieldのinputから、取得
//             data: {
//                 name: $('#user-search-field').val()
//             },
//             dataType: 'json'
//         })
//         // ・ステータスコードは正常で、dataTypeで定義したようにパース出来たとき
//         .done(function(json){
//             var insertHtml = '';
//             json.forEach(function(user){
//                 insertHtml += buildAddUserHTML(user);
//             });
//             $('#user-search-result').html(insertHtml);
//         })
//         // ・サーバからステータスコード400以上が返ってきたとき
//         // ・ステータスコードは正常だが、dataTypeで定義したようにパース出来なかったとき
//         // ・通信に失敗したとき
//         .fail(function(){
//             alert('エラー発生');
//         })
//     }
//
//     // ユーザー検索
//     // idがuser-search-fieldのところが、
//     //  change = フォーカスが外れたときに発生する
//     //  keyupはカーソル移動や全角・半角の切り替えなどすべてのキー操作を拾う
//     //　userSearch関数を起こす。
//     $('#user-search-field').on('change keyup', usersSearch);
//
//
//     // 結果をidがuser-search-fieldに出していく。
//     // idがuser-search-resultのところで、
//     // clickされたとき、
//     // 定義された関数を起こす。
//
//     //https://w3g.jp/blog/jquery-data-attr-cache jQueryでdata取得
//     //　http://www.jquerystudy.info/tutorial/basic/this2.html - jQuery入門講座 使い方 -thisについて
//     //
//     // $(this)は、イベントが発生した要素のid属性の値を取得するもの
//     // var $this = $(this);
//     //      var id = $this.data('userId');
//     //      buildAddHTMl関数で、'<div id="chat-group-user-' + id +  '">' と加えるので、それで、userIdを取得。
//
//     $('#user-search-result').on('click', '.user-search-add', function(){
//         var $this = $(this);
//         var id = $this.data('userId');
//         var name = $this.data('userName');
//
//         var insertHTML = buildDeleteUserHTML(id, name);
//
//         // appendは追加
//         $('#chat-group-users').append(insertHTML);
//
//         // removeは削除
//         $this.parent('.chat-group-user').remove();
//     });
//
//     $('#chat-group-users').on('click', '.user-search-remove', function(){
//         var $this = $(this);
//         var id = $this.data('userId');
//
//         // フォームからユーザー削除
//         $('#chat-group-user-' + id).remove();
//     });
//
//     // 今後、userのidを渡さないといけないので、htmlのタグを一気に入れるため、関数にする。
//     function buildAddUserHTML(user) {
//         var html =
//             '<div>' +
//             '<p>' +
//             user.name +
//             '</p>' +
//             '<a class="user-search-add" ' +
//                     'data-user-id="' + user.id + '" data-user-name="' + user.name + '">追加' +
//             '</a>' +
//             '</div>';
//         return html
//     }
//
//     //　今度は、削除する関数
//     function buildDeleteUserHTML(id, name) {
//         var html =
//             '<div id="chat-group-user-' + id +  '">' +
//             '<input type="hidden" name="chat_group[user_ids][]" value="' + id + '">' +
//             '<p class="chat-group-user">' +
//             name +
//             '</p>' +
//             '<a class="user-search-remove" data-user-id="' + id + '">削除' +
//             '</a>' +
//             '</div>';
//         return html
//     }
// });
//


