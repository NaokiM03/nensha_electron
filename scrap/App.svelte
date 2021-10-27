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

  const keydown = (e) => {
    if (e.ctrlKey === true) {
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

  let src = "dummy_image.png";
</script>

<svelte:window on:keydown={keydown} />

<img {src} alt="" />

<style>
  img {
    -webkit-app-region: drag;
  }
</style>
