$("#plus").click(function () {
    let $input = $("#amountt").val();
    let count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
});
