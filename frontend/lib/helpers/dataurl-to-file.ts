export function convertDataUrlToBlob(dataUrl: string): Blob | undefined {
  const arr = dataUrl.split(",");
  const matches = arr[0].match(/:(.*?);/);
  if (!matches?.length) return;
  const mime = matches[0];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
}


export const toBase64 = (file:File)=> new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result)
      resolve(reader.result as string);
    }
    reader.onerror = reject;
});

