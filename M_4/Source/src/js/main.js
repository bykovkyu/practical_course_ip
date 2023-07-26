import $ from './lib/lib';

// console.log($('.more').closest('.findmeds'));
// console.log($('.findme').siblings().toggleClass('pups'));
// $('button').fadeOut(1800, () => $('button').fadeIn(1800));

$('#first').on('click', () => {
    $('div').eq(1).fadeToggle(800);
});
$('[data-count="second"]').on('click', () => {
    $('div').eq(2).fadeToggle(800);
});
$('button')
    .eq(2)
    .on('click', () => {
        $('.w-500').fadeToggle(800);
    });
