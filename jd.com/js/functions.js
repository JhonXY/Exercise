// 点p为鼠标当前的点
// 点A为鼠标上一次的点
// 点B，C为sub子菜单的上边缘和下边缘
/*
向量Vab = Pb -Pa

二维向量叉乘公式：
a(x1,y1) * b(x2,y2) = x1*y2 - x2*y1

用叉乘法判断是否在三角形内
*/

function sameSign(a, b){
    return(a ^ b) >= 0
}

function vector(a, b){
    return{
        x:b.x - a.x,
        y:b.y - a.y
    }
}

function vectorProduct(v1, v2){
    return v1.x * v2.y - v2.x * v1.y
}

function isPointInTrangle(p, a, b, c){
    var pa = vector(p, a)
    var pb = vector(p, b)
    var pc = vector(p, c)

    var t1 = vectorProduct(pa, pb)
    var t2 = vectorProduct(pb, pc)
    var t3 = vectorProduct(pc, pa)

    return sameSign(t1, t2) && sameSign(t2, t3)
}

// 基于用户的行为切换是否延迟操作
function needDelay(elem, leftCorner, currMousePos){
    var offset = elem.offset()

    var topLeft = {
        x:offset.left,
        y:offset.top
    }

    var bottomLeft = {
        x:offset.left,
        y:offset.top + elem.height()
    }

    return isPointInTrangle(currMousePos, leftCorner, topLeft, bottomLeft)
}
