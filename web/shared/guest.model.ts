export interface GuestDoc {
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