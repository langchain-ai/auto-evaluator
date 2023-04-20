import { getSegmentParam } from '../../server/app-render/get-segment-param';
export const matchSegment = (existingSegment, segment)=>{
    // Common case: segment is just a string
    if (typeof existingSegment === 'string' && typeof segment === 'string') {
        return existingSegment === segment;
    }
    // Dynamic parameter case: segment is an array with param/value. Both param and value are compared.
    if (Array.isArray(existingSegment) && Array.isArray(segment)) {
        return existingSegment[0] === segment[0] && existingSegment[1] === segment[1];
    }
    return false;
};
/*
 * This function is used to determine if an existing segment can be overridden by the incoming segment.
 */ export const canSegmentBeOverridden = (existingSegment, segment)=>{
    var ref;
    if (Array.isArray(existingSegment) || !Array.isArray(segment)) {
        return false;
    }
    return ((ref = getSegmentParam(existingSegment)) == null ? void 0 : ref.param) === segment[0];
};

//# sourceMappingURL=match-segments.js.map