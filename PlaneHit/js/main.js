/**
 * Created by apple on 16/1/14.
 */
var canvas, ctx;
var imgLoad = [];
var plane;
//子弹数组
var bulletArray = {};
//敌人数组
var enemyArray = {};
//得分
var point, pointNumber = 0;
//是否删除子弹
var isCollide = {
    isCollide: "unCollide",
    bulletNumber: 0
};

window.onload = function () {
    point = document.getElementById("point");

    canvas = document.getElementById("game");
    ctx = canvas.getContext("2d");
    var imgSrc = ["./images/plane.png", "./images/cartridge.png", "./images/enemy.png"];

    var imgLoadCount = 0;

    //加载图片,当图片加载完之后执行game函数
    for (var i = 0; i < imgSrc.length; i ++) {
        imgLoad[i] = new Image();
        imgLoad[i].src = imgSrc[i];
        imgLoad[i].onload = function () {
            imgLoadCount ++;
            if (imgLoadCount == imgSrc.length) {
                game();
            }
        }
    }
};

function game() {
    //屏幕大小
    var size = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    //设置屏幕大小
    canvas.width = size.width;
    canvas.height = size.height;

    //设置子弹计数器,敌人计数器
    var bulletNumber = 0, enemyNumber = 0;
    //设置我方飞机基本参数
    var startX = size.width / 2, startY = size.height * 0.8;

    //初始化我方飞机
    plane = new Plane(startX, startY, imgLoad[0]);
    ctx.drawImage(plane.img, plane.x - 25, plane.y - 25, 50, 50);

    //给canvas添加监听事件,当touchmove的时候改变我方飞机的位置,让飞机跟随手所滑动的位置.
    canvas.addEventListener('touchmove', function(e) {
        //防止e的改变
        e = e || window.event;
        //阻止除了touchmove之外的其他touchmove事件
        e.preventDefault();
        ctx.clearRect(plane.x - 25, plane.y - 25, 50, 50);
        plane.x = e.targetTouches[0].pageX;
        plane.y = e.targetTouches[0].pageY;
        ctx.drawImage(plane.img, plane.x - 25, plane.y - 25, 50, 50);
    });

    //设置飞机子弹,每250s产生一发子弹
    setInterval(function () {
        bulletArray[bulletNumber] = new Bullet(plane.x, plane.y, imgLoad[1]);
        ctx.drawImage(bulletArray[bulletNumber].img, plane.x - 2.5, plane.y - 50, 5, 20);
        bulletArray[bulletNumber].move(bulletArray[bulletNumber], bulletNumber, ctx);
        bulletNumber ++;
    }, 250);

    var generateTime = Math.random() * 500, generatePosition = 0;
    var enemyStartX = canvas.width - imgLoad[2].width * 2;

    //设置敌人,随机时间在300-500之间在宽度0~100%之间随机位置出现
    setInterval(function () {
        generatePosition = Math.random();
        enemyArray[enemyNumber] = new Enemy(enemyStartX * generatePosition + imgLoad[2].width, -imgLoad[2].height, imgLoad[2]);
        ctx.drawImage(enemyArray[enemyNumber].img, enemyArray[enemyNumber].x, enemyArray[enemyNumber].y, 57, 43);
        enemyArray[enemyNumber].move(enemyArray[enemyNumber], enemyNumber, ctx);
        enemyNumber ++;
    }, generateTime + 1000);
}

function Plane(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.box = {
        width: img.width,
        height: img.height
    };
}

function Bullet(x, y, img) {
    this.x = x - 2.5;
    this.y = y - 50;
    this.img = img;
    this.box = {
        width: img.width,
        height: img.height
    };
    this.move = function (bullet, bulletNumber, ctx) {
        var bulletRun = setInterval(function () {
            ctx.clearRect(bullet.x - 1, bullet.y, 7, 20);
            bullet.y -= 5;
            ctx.drawImage(bullet.img, bullet.x, bullet.y, 5, 20);
            ctx.drawImage(plane.img, plane.x - 25, plane.y - 25, 50, 50);
            if (bullet.y <= 0 || (isCollide.isCollide == "collide" && isCollide.bulletNumber == bulletNumber)) {
                window.clearInterval(bulletRun);
                ctx.clearRect(bullet.x - 1, bullet.y, 7, 20);
                delete(bulletArray[bulletNumber]);
            }
        }, 15);
    }
}

function Enemy(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.point = [100, 1000, 10000];
    this.box = {
        width: img.width,
        height: img.height
    };
    this.move = function (enemy, enemyNumber, ctx) {
        var enemyRun = setInterval(function () {
            ctx.clearRect(enemy.x - 1, enemy.y - 1, enemy.box.width + 2, enemy.box.height + 2);
            enemy.y += 5;
            ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.box.width, enemy.box.height);
            ctx.drawImage(plane.img, plane.x - 25, plane.y - 25, 50, 50);
            isCollide = collide(enemy);
            if (enemy.y >= canvas.height || isCollide.isCollide === "collide") {
                window.clearInterval(enemyRun);
                ctx.clearRect(enemy.x - 1, enemy.y - 1, enemy.box.width + 2, enemy.box.height + 2);
                delete(enemyArray[enemyNumber]);
            }
        }, 30);
    }
}

function collide(enemy) {
    var collideBorderBottom = enemy.y + enemy.box.height;
    for (var i in bulletArray) {
        if (bulletArray[i].y <= collideBorderBottom) {
            if (bulletArray[i].x <= enemy.x + enemy.box.width - bulletArray[i].box.width && bulletArray[i].x >= enemy.x) {
                pointNumber += enemy.point[0];
                point.innerHTML = pointNumber;
                return {
                    isCollide: "collide",
                    bulletNumber: i
                };
            }
        }
    }
    return {
        isCollide: "unCollide",
        bulletNumber: 0
    };
}