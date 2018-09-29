function getPath(node) {
    let path = [];

    function getNth(element) {
        const index = Array.from(element.parentNode.children).indexOf(element) + 1;
        return element.nodeName + ":nth-child("+ index +")";
    }

    function getParentId(node) {
        if (node.id) {
            return "#" + node.id;
        }
        path.push(getNth(node));
        return getParentId(node.parentElement);
    }

    let pathStr = getParentId(node);
    while(path.length > 0) {
        pathStr += " > " + path.pop();
    }
    return pathStr;
}

/**
 Тестировал тут https://www.cbr.ru/
 Например, если в $0 элемент из раздела "Новое на сайте".
 То getPath($0); вернет:
 "#content > DIV:nth-child(1) > DIV:nth-child(2) > DIV:nth-child(3) > DIV:nth-child(2) > DIV:nth-child(1) > DL:nth-child(1) > DD:nth-child(2) > A:nth-child(1)"

 Проверить можно так:
  document.querySelectorAll(getPath($0));
  Возвращается только нужный элемент.

 */