export interface ICompany {
    name?: string;
    address?: string;
    contactInfo?: string;
};

export class Company implements ICompany {
    constructor(
        public name?: string,
        public address?: string,
        public contactInfo?: string
    ) {}
}
