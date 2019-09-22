export interface IContact {
    id?: string,
    name: string,
    email: string,
    phones: [{
        label: string,
        number: number
    }]
  }