module('Tire dom.js');

test('is', function () {
  ok($('.test').is('div'), true, 'Should return true if the element matches the selector');
});

test('closest', function () {
  equal($('div').closest('body').get(0), document.body, 'Should return body element');
});

test('parent', function () {
  equal($('.test-area').parent().get(0), document.body, 'Should return body element');
});

test('children', function () {
  equal($('.test-area').children().eq(-1).get(0), $('#remove-me-b').get(0), 'Should return children elements');
});

test('text', function () {
  expect(2);
  $('.test').text('test text');
  equal($('.test').text(), 'test text', 'Should return text content for element');
  $('.trunk').text('test text');
  equal($('.trunk').text(), 'test text', 'Should return text content for element');
});

test('val', function () {
  var elm = $('input[type=text]');
  elm.val('');
  equal(elm.val(), '', 'Should return value of input element');
  elm.val('test text');
  equal(elm.val(), 'test text', 'Should return value of input element');
  elm.val(undefined);
  equal(elm.val(), '', 'Should return empty value of input element with undefined argument');
  elm.val(null);
  equal(elm.val(), '', 'Should return empty value of input element with null argument');
  elm.val(1);
  equal(elm.val(), '1', 'Should return number as string with number argument');
});

test('html', function () {
  var el = $('.html');
  el.html('html test');
  equal(el.html(), 'html test', 'Should return inner html for element after it changed');
});

test('append', function () {
  var el = $('.html');
  el.empty();
  el.append('<p>append</p>');
  equal(el.children().html(), 'append', 'Should return inner html for element');
  var divs = $(['<div />', '<div />']);
  el = $('#divs');
  el.append(divs);
  equal(el.children().length, divs.length, 'Should contains the same count divs as we appended');
});

test('prepend', function () {
  var el = $('.html');
  el.empty();
  el.prepend('<p>prepend</p>');
  equal(el.children().html(), 'prepend', 'Should return inner html for element');
  el = $('#divs');
  el.prepend($(['<p>prepend</p>', '<p>prepend2</p>']));
  equal(el.children().eq(0).text(), 'prepend', 'Should return inner text for element');
  equal(el.children().eq(1).text(), 'prepend2', 'Should return inner text for element');
});

test('before', function () {
  var el = $('#divs-before');
  el.append('<div />');
  el = el.find('div');
  el.before('<p>before</p>');
  equal(el.parent().find('p').eq(0).html(), 'before', 'Should return inner html for element');
  var divs = $(['<div />', '<div />']);
  el.before(divs);
  equal(el.parent().children().length, divs.length + 2, 'Should contains the same count divs as we added before, plus two extra for existing div');
});

test('after', function () {
  var el = $('#divs-after');
  el.append('<div />');
  el = el.find('div');
  el.after('<p>after</p>');
  equal(el.parent().find('p').eq(0).html(), 'after', 'Should return inner html for element');
  var divs = $(['<div />', '<div />']);
  el.after(divs);
  equal(el.parent().children().length, divs.length + 2, 'Should contains the same count divs as we added before, plus two extra for existing div');
});

test('appendTo', function () {
  var el = $('#playground div').clone();
  el.addClass('appendTo');
  el.appendTo('body');
  equal($('body div.appendTo').length, 1, 'Should have append the div to body');
  el.remove();
  el = $('#playground div').clone();
  el.addClass('appendTo');
  el.appendTo($('body'));
  equal($('body div.appendTo').length, 1, 'Should have append the div to body');
  el.remove();
});

test('prependTo', function () {
  var el = $('#playground div').clone();
  el.addClass('prependTo');
  el.prependTo('#test-area');
  equal($('#test-area div.prependTo').length, 1, 'Should have prepend the div to test area div');
  el.remove();
  el = $('#playground div').clone();
  el.addClass('prependTo');
  el.prependTo($('#test-area'));
  equal($('#test-area div.prependTo').length, 1, 'Should have prepend the div to test area div');
  el.remove();
});

test('insertBefore', function () {
  var el = $('#playground div').clone();
  el.addClass('insertBefore');
  el.insertBefore('#qunit');
  equal($('body div').eq(0).length, 1, 'Should have inserted the div before qunit div');
  el.remove();
  el = $('#playground div').clone();
  el.addClass('insertBefore');
  el.insertBefore($('#qunit'));
  equal($('body div').eq(0).length, 1, 'Should have inserted the div before qunit div');
  el.remove();
});

test('insertAfter', function () {
  var el = $('#playground div').clone();
  el.addClass('insertAfter');
  el.insertAfter('#qunit');
  equal($('body div').eq(2).length, 1, 'Should have inserted the div after qunit div');
  el.remove();
  el = $('#playground div').clone();
  el.addClass('insertAfter');
  el.insertAfter($('#qunit'));
  equal($('body div').eq(2).length, 1, 'Should have inserted the div after qunit div');
  el.remove();
});

test('remove', function () {
  $('#remove-me-a').remove();
  equal(document.getElementById('remove-me-a'), null, 'Element should not exists after calling remove');
});

test('table elements', function () {
  equal($('<td></td>').get(0).parentNode.nodeName.toLowerCase(), 'tr');
  equal($('<th></th>').get(0).parentNode.nodeName.toLowerCase(), 'tr');
  equal($('<tr></tr>').get(0).parentNode.nodeName.toLowerCase(), 'tbody');
  equal($('<thead></thead>').get(0).parentNode.nodeName.toLowerCase(), 'table');
  equal($('<tbody></tbody>').get(0).parentNode.nodeName.toLowerCase(), 'table');
  equal($('<tfoot></tfoot>').get(0).parentNode.nodeName.toLowerCase(), 'table');
});

test('append elements to empty table element', function () {
  var a = $('#table-a');

  // thead, tr, th
  a.append('<thead><tr><th>Name</th></tr></thead>');

  equal(a.children().length, 1);
  equal(a.children().get(0).nodeName.toLowerCase(), 'thead');
  equal(a.children().eq(0).children().length, 1);
  equal(a.children().eq(0).children().get(0).nodeName.toLowerCase(), 'tr');
  equal(a.children().eq(0).children().children().length, 1);
  equal(a.children().eq(0).children().children().get(0).nodeName.toLowerCase(), 'th');
  equal(a.children().eq(0).children().children().text(), 'Name');

  // tbody, tr, td
  a.append('<tbody><tr><td>Fredrik</td></tr></tbody>');

  equal(a.children().length, 2);
  equal(a.children().get(1).nodeName.toLowerCase(), 'tbody');
  equal(a.children().eq(1).children().length, 1);
  equal(a.children().eq(1).children().get(0).nodeName.toLowerCase(), 'tr');
  equal(a.children().eq(1).children().children().length, 1);
  equal(a.children().eq(1).children().children().get(0).nodeName.toLowerCase(), 'td');
  equal(a.children().eq(1).children().children().text(), 'Fredrik');
});

test('append elements to table with existing thead', function () {
  var b = $('#table-b');

  // tbody, tr, td
  b.append('<tbody><tr><td>Fredrik</td></tr></tbody>');

  equal(b.children().length, 2);
  equal(b.children().get(1).nodeName.toLowerCase(), 'tbody');
  equal(b.children().eq(1).children().length, 1);
  equal(b.children().eq(1).children().get(0).nodeName.toLowerCase(), 'tr');
  equal(b.children().eq(1).children().children().length, 1);
  equal(b.children().eq(1).children().children().get(0).nodeName.toLowerCase(), 'td');
  equal(b.children().eq(1).children().children().text(), 'Fredrik');
});

test('append and prepend td to tr with existing table', function () {
  var c = $('#table-c tbody tr');

  c.append('<td>Fredrik</td>');

  equal(c.children().length, 1);
  equal(c.children().get(0).nodeName.toLowerCase(), 'td');
  equal(c.children().text(), 'Fredrik');

  c.prepend('<td>Maria</td>');

  equal(c.children().length, 2);
  equal(c.children().get(0).nodeName.toLowerCase(), 'td');
  equal(c.children().text(), 'Maria');
});

test('each', function () {
  var t = $('#a-container')
    , $ul1 = $('ul', t).eq(0)
    , $ul2 = $('ul', t).eq(1)
    , tags = $('div a', t);

  $ul1.css('background', 'red');

  tags.each(function (i, el) {
    $ul1.append('<li>ul1 - a: ' + $(el).text() + ' i: ' + i + '</li>');
  });

  $ul2.css('background', 'green');

  $.each(tags, function (i, el) {
    $ul2.append('<li>ul2 - a: ' + $(el).text() + ' i: ' + i + '</li>');
  });

  notEqual($ul1.css('background'), $ul2.css('background'));
  equal($ul1.attr('id'), 'ul1');
  equal($ul1.find('li').length, 3);
  ok($ul1.find('li').text().indexOf('ul1') !== -1);

  notEqual($ul2.css('background'), $ul1.css('background'));
  equal($ul2.attr('id'), 'ul2');
  equal($ul1.find('li').length, 3);
  ok($ul2.find('li').text().indexOf('ul2') !== -1);
});

test('empty', function () {
  var el = $('.html').empty();
  equal(el.html(), '', 'Should return empty inner html after empty');
  el = $('#table-a').empty();
  equal(el.html(), '', 'Should return empty inner html after empty table');
});