export class UserTitles {
    public userTitles: UserTitle[];

    constructor(userTitles: UserTitle[]) {
        this.userTitles = userTitles;
    }
}

export class UserTitle {
    public id: string;
    public title: {
        EN: string;
        TR: string;
    };
    public titleStr: string;
    public userRole?: string; // Made optional
    public isActive: boolean;
    public createdDate: string;
    public updatedDate?: string | null; // Made optional

    constructor(
        id: string,
        title: string,
        isActive: boolean,
        createdDate: string,
        userRole?: string,
        updatedDate?: string | null // Made optional
    ) {
        this.id = id;
        this.title = {
            EN: title,
            TR: title
        };
        this.titleStr = title;
        this.userRole = userRole ?? null; // Default to null if undefined
        this.isActive = isActive;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate ?? null; // Default to null if undefined
    }
}
