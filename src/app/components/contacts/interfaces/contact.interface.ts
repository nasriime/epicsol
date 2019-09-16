export interface IContact {
    name: string,
    email: string,
    phones: [{
        label: string,
        number: number
    }]
  }