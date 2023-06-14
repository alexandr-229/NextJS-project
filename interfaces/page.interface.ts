export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products
}

export interface PageModel {
	_id: string;
	tags: string[];
	secondCategory: string;
	alias: string;
	title: string;
	category: string;
	tagsTitle: string;
	firstCategory: TopLevelCategory;
	advantages?: IAdvantage[];
	createdAt: Date;
	updatedAt: Date;
	justjoinit?: JustjoinIT;
	qas: any[];
	addresses: any[];
	categoryOn: string;
	blog: IBlog;
	sravnikus: ISravnikus;
	learningclub: ILearningclub;
}

export interface IAdvantage {
	title: string;
	description: string;
	_id: string;
}

export interface JustjoinIT {
	count: number;
	juniorSalary: number;
	middleSalary: number;
	seniorSalary: number;
	updatedAt: Date;
	_id: string;
}

export interface IBlog {
	h1: string;
	metaTitle: string;
	metaDescription: string;
	views: number;
	_id: string;
}

export interface ISravnikus {
	metaTitle: string;
	metaDescription: string;
	qas: any[];
	_id: string;
}

export interface ILearningclub {
	metaTitle: string;
	metaDescription: string;
	qas: any[];
	_id: string;
}
