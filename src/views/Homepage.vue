<template>
    <header class="header">
        <div>
            <img class="logo" id="multilogo" src="../assets/homepage/icons/multilogo.png">
            <img class="logo" id="cathy" src="../assets/homepage/icons/cathy.png">
            <p class="title" id="title-left">国泰航空</p>
            <p class="title" id="title-right">多式联运 · 全链条出行</p>
        </div>
    </header>
    <main class="content">
        <div class="carousel-container">
            <!-- Bootstrap Carousel -->
            <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
                <!-- Carousel Indicators -->
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" class="active"
                        aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
                </div>

                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="../assets/homepage/images/consultation1.jpg" class="d-block w-100" alt="Image 1">
                    </div>
                    <div class="carousel-item">
                        <img src="../assets/homepage/images/consultation2.jpg" class="d-block w-100" alt="Image 2">
                    </div>
                    <div class="carousel-item">
                        <img src="../assets/homepage/images/consultation3.jpg" class="d-block w-100" alt="Image 3">
                    </div>
                </div>

                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        <p>这是页面的内容部分。</p>
        <p>向下滚动时，头部将保持固定。</p>
    </main>
</template>

<script>
export default {
    name: 'StickyHeader',
};
</script>

<style scoped>
body {
    margin: 0;
    font-family: Arial, sans-serif;
}

.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 15px;
    background: #f6f6f2;
    color: white;
    padding: 1px;
    z-index: 1000;
    overflow: hidden;
}

.header .logo {
    position: absolute;
    top: 8px;
    left: 5px;
    height: 15px;
    transform: translate(0%, -50%);
}

.header #multilogo {
    left: 5px;
}

.header #cathy {
    height: 10px;
    left: 50%;
    transform: translate(-50%, -50%);
}

.header .title {
    position: absolute;
    color: #016b6c;
    font-size: 4px;
    top: 8px;
    transform: translate(0, -50%);
}

.header #title-right {
    right: 5px;
}

.header #title-left {
    left: 24px;
}

.content {
    padding-top: 10vh;
    /* 留出头部空间 */
}

.carousel-container {
    position: absolute;
    left: 0;
    top: 17px;
    width: 100%;
    height: 40vh;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.carousel-container .carousel-indicators {
    position: relative;
    top: 90vh;
    height: 20px;
}

.carousel-container .carousel-indicators button {
    background-color: #fff;
    /* Customize the color */
    width: 20px;
    height: 1px;
    border: none;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
    background-size: 60%;
    /* Reduce the size of the icons */
}
</style>