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

  let src = "dummy_image.png";

  let isInvisible = true;
</script>

<svelte:window on:keydown={keydown} on:keyup={keyup} />

<img {src} alt="" />
<div class:isInvisible />

<style>
  :global(body) {
    position: relative;
  }

  img {
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
