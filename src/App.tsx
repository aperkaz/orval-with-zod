import { useEffect } from "react";
import { findPetsByTags } from "./http-client/fetch-client";
import { findPetsByTagsResponse } from "./http-client/zod-schemas";

function App() {
  useEffect(() => {
    const fetch = async () => {
      // fetch client example with manual validation
      const res = await findPetsByTags({ tags: ["string"] });
      console.log(findPetsByTagsResponse.parse(res.data));
    };
    fetch();
  }, []);

  return <div>react app</div>;
}

export default App;
