export interface GuestDoc {
    id?: string;
    first_name: string;
    last_name: string;
    address: string;
}

export interface GuestResponseDoc {
    id?: string;
    is_coming: boolean;
    diet_option: string;
    diet_extra_info?: string;
    transport_required: boolean;
    transport_location?: string;
    created_at: string;
}

export interface FamilyGuestDoc {
    id?: string;
    first_name: string;
    last_name: string;
}

export interface Family {
    id?: string;
    address: string;
    family_name: string;
    guests: FamilyGuestDoc[];
}

export interface FamilyResponseDoc {
    id?: string;
    responses: GuestResponseDoc[];
}
