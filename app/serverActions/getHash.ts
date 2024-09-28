"use server";
export async function getHash(block: number) {
  try {
    const response = await fetch(
      `https://blockstream.info/api/block-height/${block}`
    );
    const reader = response.body?.getReader();
    let hash = "";

    const decoder = new TextDecoder();
    while (true) {
      if (!reader) throw new Error("Reader is undefined");
      const { done, value } = await reader.read();
      if (done) break;
      hash += decoder.decode(value);
    }

    return hash;
    // console.log("chunks: ", chunks);
  } catch (error) {
    throw new Error(error as string);
  }
}
