type RequestType = {
    method: 'POST' | 'PUT' | 'DELETE' | 'GET' | string
}
type PostRequestType = RequestType & {
    headers: DynamicObject
    body?: string
}