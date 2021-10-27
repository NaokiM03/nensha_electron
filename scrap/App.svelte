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
    a.download = "image.png";
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
