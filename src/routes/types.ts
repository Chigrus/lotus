export type User = {
    isAdmin: boolean;
    isEditor: boolean;
}
export type OG = {
    title: string;
    description: string;
    og_type: string;
    og_title: string;
    og_description: string;
    og_url: string;
    og_image: string;
    og_image_type: string;
    og_image_width: string;
    og_image_height: string;
    og_article: Object;
    og_profile: Object;
    og_video: Object;
}
export type Post = {
    id: number;
    date: Date;
    slug: string;
    title: string;
    text: string;
    publication: boolean;
    post: Nodes;
    icon: string;
    [key: string]: any;
}
export type Posts = Post[];
export type AdministrationUser = {
    id: number;
    display_name: string;
    user_post: string;
    user_photo: string;
}
export type AdministrationList = AdministrationUser[];
export type Node = {
    type: string;
    content: string;
    [key: string]: any;
}
export type Nodes = Node[];