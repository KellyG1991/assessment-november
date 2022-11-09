import axios, { AxiosInstance } from "axios";

export type ResultRickMortyEpisode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: Character[];
  url: string;
  created: string;
};

export type ApiRickMortyEpisode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: [string];
  url: string;
  created: string;
};

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: OriginLocation;
  location: OriginLocation;
  image: string;
  episode: [string];
  url: string;
  created: string;
};

type OriginLocation = {
  name: string;
  url: string;
};

export class Result<T> {
  public static Success<T>(data: T): Result<T> {
    return new Result<T>(data);
  }

  public static Error<T>(error: string): Result<T> {
    return new Result<T>(undefined, error);
  }

  public static Exception<T>(error: Error): Result<T> {
    return new Result<T>(undefined, error.message);
  }

  private readonly data?: T;
  private readonly error?: string;

  private constructor(data?: T, error?: string) {
    this.data = data;
    this.error = error;
  }

  public isSuccessful(): boolean {
    return this.data != undefined;
  }

  public getData(): T {
    return this.data as T;
  }

  public getError(): string {
    return this.error as string;
  }

  public throwIfError(): void {
    if (!this.isSuccessful()) {
      throw new Error(this.getError());
    }
  }
}

export class ApiService {
  public constructor(private axiosInstance: AxiosInstance) {}

  public async get(url: string) {
    try {
      const response = await this.axiosInstance.get(url);
      return Result.Success(response.data);
    } catch (error) {
      if (error instanceof Error) {
        this.logError("GET", url, error);
        return Result.Exception(error);
      }
      throw error;
    }
  }

  private logError(method: string, url: string, error: Error): void {
    console.log(`Api service: ${method} error from ${url}: ${error.message}`);
  }
}

const apiService = new ApiService(axios.create());
const EPISODE_API = "https://rickandmortyapi.com/api/episode?count=1000";
const CHARACTERS_API = "https://rickandmortyapi.com/api/character?count=1000";

const getEpisodeCharacters = (
  characterUrls: string[],
  characters: Character[]
) => {
  const characterIds = characterUrls.map(
    (url) => url.split("/")[url.split("/").length - 1]
  );

  return characters.filter((character) =>
    characterIds.includes(character.id.toString())
  );
};

const getAllData = async <T>(url: string) => {
  let allData: T[];
  const charactersApiData = (await apiService.get(url)).getData();
  let next = charactersApiData.info?.next;
  allData = [...charactersApiData.results];

  while (next) {
    const apiData = (await apiService.get(next)).getData();
    allData = [...allData, ...apiData.results];
    next = apiData.info?.next;
  }

  return allData;
};

const getEpisodes = async () => {
  const characters: Character[] = await getAllData(CHARACTERS_API);
  const episodes: ApiRickMortyEpisode[] = await getAllData(EPISODE_API);

  return episodes.map(async (episode) => {
    const refactoredCharactersList = getEpisodeCharacters(
      episode.characters,
      characters
    );
    let result = [];
    if (refactoredCharactersList) {
      const data: ResultRickMortyEpisode = {
        id: episode.id,
        name: episode.name,
        episode: episode.episode,
        air_date: episode.air_date,
        characters: refactoredCharactersList,
        url: episode.url,
        created: episode.created,
      };

      result.push(data);
    }
    console.log(result);
    return result;
  });
};

async function script() {
  return await getEpisodes();
}

script();
