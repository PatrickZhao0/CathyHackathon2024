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
                        <img src="../assets/homepage/images/info1.jpg" class="d-block w-100" alt="Image 1">
                    </div>
                    <div class="carousel-item">
                        <img src="../assets/homepage/images/info2.jpg" class="d-block w-100" alt="Image 2">
                    </div>
                    <div class="carousel-item">
                        <img src="../assets/homepage/images/info3.jpg" class="d-block w-100" alt="Image 3">
                    </div>
                </div>
            </div>
        </div>
        <div></div>
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
    height: 70px;
    background: #f6f6f2;
    color: white;
    z-index: 1000;
    overflow: hidden;
}

.header .logo {
    position: absolute;
    top: 50%;
    height: 70px;
    transform: translate(0%, -50%);
}

.header #multilogo {
    left: 15px;
}

.header #cathy {
    height: 50px;
    left: 50%;
    transform: translate(-50%, -50%);
}

.header .title {
    position: absolute;
    color: #016b6c;
    font-size: 20px;
    top: 50%;
    transform: translate(0, -50%);
}

.header #title-right {
    right: 25px;
}

.header #title-left {
    left: 100px;
}

.content {
    padding-top: 10vh;
    /* 留出头部空间 */
}

.carousel-container {
    position: fixed;
    left: 0;
    top: 75px;
    width: 100%;
    height: 300px;
    background-color: white;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    overflow: hidden;
}

.carousel-container .carousel-inner {
    position: relative;
    left: 0;
    width: 200vh;
}

.carousel-container .carousel-indicators {
    position: fixed;
    top: 350px;
    height: 100px;
}

.carousel-container .carousel-indicators button {
    background-color: #fff;
    /* Customize the color */
    width: 100px;
    height: 5px;
    border: none;
}
</style>