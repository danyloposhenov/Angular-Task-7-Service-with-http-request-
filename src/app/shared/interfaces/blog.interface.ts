export interface IBlog {
  id: number,
  title: string,
  text: string,
  author: string
}

export interface IBlogRequest {
  title: string,
  text: string,
  author: string
}

export interface IBlogResponse extends IBlogRequest {
  id: number
}
