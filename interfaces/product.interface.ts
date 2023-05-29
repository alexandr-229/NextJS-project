export interface ProductCharacteristic {
	name: string;
	value: string;
}

export interface ReviewModel {
	_id: string;
	name: string;
	title: string;
	description: string;
	rating: number;
	createdAt: Date;
}

export class ProductModel {
	_id: string;
	image: string;
	title: string;
	price: number;
	oldPrice?: number;
	credit: number;
	description: string;
	advatanges?: string;
	disAdvatanges?: string;
	categories: string[];
	tags: string[];
	characteristics: ProductCharacteristic[];
	reviewAvg?: number;
	reviews: ReviewModel[];
	reviewCount: number;
}
