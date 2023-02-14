$(function() {
    /*Initialise all tooltips*/
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
        })
    /*Copy code function*/    
    $('.copythis').after('<button type="button" class="btn btn-primary btn-block w-75 mx-auto copybutton bg-img-none mt-2 d-block"><span class="fa fa-clipboard" aria-hidden="true"></span> Copy code for above element</button>');
    $('.copybutton').on('click', function(event) {
        var btn = $(this);
        var btnHtml = $(this).html();
        var snippet = btn.prev().html();
        var snippet = snippet.replace(/\s{4,}/g, '');
        console.log("@GB: snippet = ", snippet);
        fallbackCopyTextToClipboard(snippet);
        btn.toggleClass('btn-success btn-primary');
        btn.html('<span style="color: var(--bs-bg-color) !important" class="fa fa-check"></span> Code copied');
        window.setTimeout(function() {
            btn.toggleClass('btn-success btn-primary');
            btn.html(btnHtml);
        }, 3000);
        /* Act on the event */
    });
});


function fallbackCopyTextToClipboard(text) {
    var btn = $('.copybutton');
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    //textArea.focus();
    textArea.select();
    
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);        
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
        
}

function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function() {

    }, function(err) {

    });
}
