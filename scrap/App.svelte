<script context="module">
  const getDateAsYYYYMMDD = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("00" + (date.getMonth() + 1).toString()).slice(-2);
    const day = ("00" + date.getDate().toString()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const alphanumeric_chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  const createAlphanumeric = () => {
    let randomString = "";
    for (let i = 0; i < 10; i++) {
      randomString += alphanumeric_chars.charAt(
        Math.floor(Math.random() * alphanumeric_chars.length)
      );
    }
    return randomString;
  };

  const getFileName = () => {
    return `${getDateAsYYYYMMDD()}-${createAlphanumeric()}`;
  };
</script>

<script>
  const getImageFromClipboard = () => {
    window.clipboard.getImage((image) => {
      src = image.data;
      window.resizeTo(image.width, image.height);
    });
  };

  const setImageToClipboard = () => {
    window.clipboard.setImage(src);
  };

  const saveImage = () => {
    const a = document.createElement("a");
    a.href = src;
    a.download = getFileName() + ".png";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const maxSize = 3840;
  const minSize = 240;

  const isOverMaxSize = () => {
    const tmpScale = (scale * 10 + 1) / 10;
    if (tmpScale <= 1.0) return false;
    const tmpWidth = naturalWidth * tmpScale;
    const tmpHeight = naturalHeight * tmpScale;
    return tmpWidth > maxSize || tmpHeight > maxSize;
  };

  const isUnderMinSize = () => {
    const tmpScale = (scale * 10 - 1) / 10;
    if (tmpScale >= 1.0) return false;
    const tmpWidth = naturalWidth * tmpScale;
    const tmpHeight = naturalHeight * tmpScale;
    return tmpWidth < minSize || tmpHeight < minSize;
  };

  const zoomIn = () => {
    if (scale >= 2.0 || isOverMaxSize()) return;
    scale = (scale * 10 + 1) / 10;
    window.resizeTo(
      Math.floor(naturalWidth * scale),
      Math.floor(naturalHeight * scale)
    );
  };

  const zoomOut = () => {
    if (scale <= 0.5 || isUnderMinSize()) return;
    console.log(scale);
    scale = (scale * 10 - 1) / 10;
    window.resizeTo(
      Math.floor(naturalWidth * scale),
      Math.floor(naturalHeight * scale)
    );
  };

  const disableDragging = () => {
    isInvisible = false;
  };

  const keydown = (e) => {
    if (e.ctrlKey === true) {
      disableDragging();

      switch (e.code) {
        case "KeyV":
          getImageFromClipboard();
          break;
        case "KeyC":
          setImageToClipboard();
          break;
        case "KeyS":
          saveImage();
          break;
      }
    }
  };

  const keyup = (e) => {
    isInvisible = true;
  };

  const wheel = (e) => {
    const isPositive = Math.sign(e.wheelDelta) === +1;
    if (isPositive) {
      zoomIn();
    } else {
      zoomOut();
    }
  };

  let isInvisible = true;

  const imgLoaded = () => {
    naturalWidth = img.naturalWidth;
    naturalHeight = img.naturalHeight;
  };

  let img;
  let src = "dummy_image.png";
  let naturalWidth = 0;
  let naturalHeight = 0;
  let scale = 1.0;
</script>

<svelte:window on:keydown={keydown} on:keyup={keyup} on:wheel={wheel} />

<img
  bind:this={img}
  {src}
  {naturalWidth}
  {naturalHeight}
  alt=""
  on:load={imgLoaded}
/>
<div class:isInvisible />

<style>
  :global(body) {
    position: relative;
  }

  img {
    width: 100%;
    height: 100%;
    -webkit-app-region: drag;
  }

  div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-app-region: no-drag;
  }
  .isInvisible {
    display: none;
  }
</style>
