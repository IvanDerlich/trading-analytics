"use server";

export async function getTimeStamp(hash: string) {
  try {
    // console.log("hash: ", hash);
    const response = await fetch(`https://blockstream.info/api/block/${hash}`);
    const reader = response.body?.getReader();
    let blockDetails = "";

    const decoder = new TextDecoder();
    while (true) {
      if (!reader) throw new Error("Reader is undefined");
      const { done, value } = await reader.read();
      if (done) break;
      blockDetails += decoder.decode(value);
      // console.log("blockDetails: ", blockDetails);
    }

    const blockDetailsJSON = JSON.parse(blockDetails);

    return blockDetailsJSON.timestamp;
    // console.log("chunks: ", chunks);
  } catch (error) {
    throw new Error(error as string);
  }
}
