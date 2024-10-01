import {
  useState,
  useEffect,
  useRef,
} from 'react'

import './App.css'

const clientID = "t-FQWYk2PUt13LidWIblzu7SNd9HVOQsK3QA7Lg1Mg4";
const utm = "?utm_source=scrimba_degree&utm_medium=referral"
interface LoadDataOptions {
  url: string;
  onSuccess?: (data: unknown) => void;
}

const loadData = (options: LoadDataOptions) => {
  fetch(options.url)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      if (options.onSuccess) options.onSuccess(data)
    })
}

const App = (props: {
  name: string,
  emoji: string
}) => {
  interface Photo {
    id: string;
    urls: {
      regular: string;
    };
    user: {
      name: string;
      links: {
        html: string;
      };
    };
  }

  const [photos, setPhotos] = useState<Photo[]>([]);

  // CHALLENGE:
  // Change the query to one of your interests
  const [query, setQuery] = useState("vampires");
  const queryInput = useRef<HTMLInputElement>(null);

  const numberOfPhotos = 20;
  const url =
    "https://api.unsplash.com/photos/random/?count=" +
    numberOfPhotos +
    "&client_id=" +
    clientID;

  useEffect(() => {
    const photosUrl = query ? `${url}&query=${query}` : url;

    loadData({
      url: photosUrl,
      onSuccess: res => {
        setPhotos(res as Photo[]);
      }
    });
  }, [query, url]);

  const searchPhotos = (e: React.FormEvent) => {
    e.preventDefault();
    if (queryInput.current) {
      setQuery(queryInput.current.value);
    }
  };

  return (
    <div className="box">
      <h2>{props.emoji}</h2>
      <h1>{props.name}'s website</h1>
      <form onSubmit={searchPhotos}>
        <input
          ref={queryInput}
          type="text"
          placeholder="Search for photos"
        />
        <button type="submit">Search</button>
      </form>
      <div className="grid">
        {query ?
          photos.map(photo => {
            return (
              <div key={photo.id} className="item">
                <img
                  className="img"
                  src={photo.urls.regular}
                />
                <div className="caption">
                  <span className="credits">Photo by
                    <a href={photo.user.links.html + utm}>   {photo.user.name}
                    </a>
                    <span> on </span>
                    <a href={"https://unsplash.com" + utm}>
                      Unsplash
                    </a>
                  </span>
                </div>
              </div>
            );
          }) : ""}
      </div>
    </div>
  );
};

export default App
