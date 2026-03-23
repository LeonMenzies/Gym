import React, { FC } from "react";
import { Image, View } from "react-native";
import { Circle, Line, Path, Svg } from "react-native-svg";
import { getImageForStretchId } from "~data/stretchBendData";

// ViewBox: 0 0 100 100
// Front-view standing figures share a common skeleton.
// Side-view is used for lying, all-fours, and floor poses.

type Props = {
    stretchId: string;
    size?: number;
    color?: string;
};

const W = 4;

const H = (cx: number, cy: number, c: string, r = 7) => (
    <Circle cx={cx} cy={cy} r={r} stroke={c} strokeWidth={W} fill="none" />
);
const L = (x1: number, y1: number, x2: number, y2: number, c: string) => (
    <Line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={W} strokeLinecap="round" />
);
const P = (d: string, c: string) => (
    <Path d={d} stroke={c} strokeWidth={W} fill="none" strokeLinecap="round" strokeLinejoin="round" />
);

// Ground line helper
const ground = (c: string, y = 80) => P(`M 10 ${y} L 90 ${y}`, c);

// ─── Standard upright standing figure (front view) ────────────────────────────
type StandOpts = {
    hx?: number; hy?: number; hr?: number;
    lax?: number; lay?: number;
    rax?: number; ray?: number;
    llx?: number; lly?: number;
    rlx?: number; rly?: number;
    tx1?: number; ty1?: number; tx2?: number; ty2?: number;
    sox?: number; soy?: number;
    noLA?: boolean; noRA?: boolean; noLL?: boolean; noRL?: boolean;
    extra?: React.ReactNode;
};

const stand = (c: string, o: StandOpts = {}) => (
    <>
        {H(o.hx ?? 50, o.hy ?? 12, c, o.hr ?? 7)}
        {L(o.tx1 ?? 50, o.ty1 ?? 19, o.tx2 ?? 50, o.ty2 ?? 52, c)}
        {!o.noLA && L(o.sox ?? 50, o.soy ?? 28, o.lax ?? 27, o.lay ?? 45, c)}
        {!o.noRA && L(o.sox ?? 50, o.soy ?? 28, o.rax ?? 73, o.ray ?? 45, c)}
        {!o.noLL && L(o.tx2 ?? 50, o.ty2 ?? 52, o.llx ?? 38, o.lly ?? 80, c)}
        {!o.noRL && L(o.tx2 ?? 50, o.ty2 ?? 52, o.rlx ?? 62, o.rly ?? 80, c)}
        {o.extra}
    </>
);

const allFours = (c: string, spineD?: string, extra?: React.ReactNode) => (
    <>
        {H(14, 55, c)}
        {P(spineD ?? "M 21 58 Q 50 42 79 58", c)}
        {L(27, 56, 22, 72, c)}
        {L(25, 56, 18, 72, c)}
        {L(73, 56, 80, 72, c)}
        {L(75, 54, 82, 70, c)}
        {ground(c, 72)}
        {extra}
    </>
);

const lyingBack = (c: string, extra?: React.ReactNode) => (
    <>
        {H(14, 50, c)}
        {L(21, 50, 65, 50, c)}
        {ground(c, 60)}
        {extra}
    </>
);

// ─── SVG illustrations map (fallback when no photo available) ─────────────────
const ILL: Record<string, (c: string) => React.ReactNode> = {

    neck_side_tilt: (c) => stand(c, {
        hx: 60, hy: 16,
        tx1: 52, ty1: 21,
        rax: 65, ray: 20,
    }),

    neck_forward_tilt: (c) => stand(c, {
        hx: 50, hy: 25,
        tx1: 50, ty1: 32,
    }),

    neck_rotation: (c) => (
        <>
            {stand(c, { hx: 56, hy: 12 })}
            {P("M 45 7 Q 53 2 61 7", c)}
        </>
    ),

    neck_ear_to_shoulder: (c) => stand(c, {
        hx: 64, hy: 20,
        tx1: 52, ty1: 23,
        rax: 68, ray: 22,
    }),

    shoulder_cross_body: (c) => stand(c, {
        rax: 18, ray: 30,
        lax: 22, lay: 32,
    }),

    shoulder_doorway: (c) => (
        <>
            {stand(c, { noLA: true, noRA: true })}
            {L(50, 28, 22, 28, c)}
            {L(22, 28, 22, 12, c)}
            {L(50, 28, 78, 28, c)}
            {L(78, 28, 78, 12, c)}
        </>
    ),

    shoulder_overhead_tricep: (c) => (
        <>
            {stand(c, { noRA: true })}
            {L(50, 28, 50, 8, c)}
            {L(50, 8, 62, 20, c)}
            {L(27, 45, 52, 15, c)}
        </>
    ),

    shoulder_eagle_arms: (c) => (
        <>
            {stand(c, { noLA: true, noRA: true })}
            {L(50, 28, 70, 40, c)}
            {L(50, 28, 30, 40, c)}
            {L(70, 40, 58, 22, c)}
            {L(30, 40, 42, 22, c)}
        </>
    ),

    shoulder_thread_needle: (c) => allFours(c, undefined, (
        <>
            {P("M 28 56 Q 45 65 68 44", c)}
        </>
    )),

    chest_doorway: (c) => stand(c, {
        lax: 8, lay: 28,
        rax: 92, ray: 28,
        sox: 50, soy: 28,
    }),

    chest_clasped_hands: (c) => (
        <>
            {stand(c, {
                lax: 38, lay: 58,
                rax: 62, ray: 58,
            })}
            {L(38, 58, 62, 58, c)}
        </>
    ),

    chest_cobra: (c) => (
        <>
            {H(16, 38, c)}
            {L(23, 44, 55, 58, c)}
            {L(55, 58, 82, 60, c)}
            {L(35, 54, 28, 68, c)}
            {L(45, 57, 40, 68, c)}
            {ground(c, 68)}
        </>
    ),

    chest_pec_corner: (c) => (
        <>
            {stand(c, { noRA: true })}
            {L(50, 28, 82, 22, c)}
            {L(82, 22, 85, 10, c)}
            {P("M 88 5 L 88 82", c)}
        </>
    ),

    back_cat_cow: (c) => allFours(c, "M 21 58 Q 50 35 79 58"),

    back_childs_pose: (c) => (
        <>
            {H(14, 62, c)}
            {L(21, 62, 8, 68, c)}
            {L(21, 64, 10, 68, c)}
            {L(21, 62, 55, 52, c)}
            {L(55, 52, 62, 62, c)}
            {L(62, 62, 58, 72, c)}
            {ground(c, 72)}
        </>
    ),

    back_seated_twist: (c) => (
        <>
            {stand(c, {
                ty2: 55,
                lax: 70, lay: 48,
                rax: 22, ray: 40,
                llx: 28, lly: 72,
                rlx: 72, rly: 65,
            })}
            {ground(c, 78)}
        </>
    ),

    back_knee_to_chest: (c) => lyingBack(c, (
        <>
            {L(65, 50, 60, 32, c)}
            {L(65, 50, 52, 30, c)}
            {L(35, 50, 55, 32, c)}
            {L(45, 50, 60, 34, c)}
        </>
    )),

    back_thread_needle: (c) => allFours(c, undefined, (
        <>
            {P("M 27 56 Q 48 62 70 44", c)}
            {H(12, 60, c, 5)}
        </>
    )),

    hip_kneeling_lunge: (c) => (
        <>
            {H(38, 18, c)}
            {L(38, 25, 42, 52, c)}
            {L(38, 32, 25, 44, c)}
            {L(38, 32, 52, 44, c)}
            {L(42, 52, 18, 52, c)}
            {L(18, 52, 12, 70, c)}
            {L(42, 52, 65, 54, c)}
            {L(65, 54, 68, 70, c)}
            {ground(c, 70)}
        </>
    ),

    hip_pigeon: (c) => (
        <>
            {H(30, 28, c)}
            {L(30, 35, 48, 52, c)}
            {L(48, 52, 24, 58, c)}
            {L(24, 58, 20, 70, c)}
            {L(48, 52, 78, 56, c)}
            {L(78, 56, 82, 70, c)}
            {L(35, 42, 14, 52, c)}
            {L(32, 42, 10, 48, c)}
            {ground(c, 70)}
        </>
    ),

    hip_low_lunge: (c) => (
        <>
            {H(42, 15, c)}
            {L(42, 22, 45, 50, c)}
            {L(42, 30, 28, 12, c)}
            {L(42, 30, 56, 12, c)}
            {L(45, 50, 20, 50, c)}
            {L(20, 50, 14, 70, c)}
            {L(45, 50, 68, 52, c)}
            {L(68, 52, 72, 70, c)}
            {ground(c, 70)}
        </>
    ),

    hip_butterfly: (c) => (
        <>
            {H(50, 15, c)}
            {L(50, 22, 50, 52, c)}
            {L(50, 35, 32, 60, c)}
            {L(50, 35, 68, 60, c)}
            {L(50, 52, 22, 66, c)}
            {L(22, 66, 48, 76, c)}
            {L(50, 52, 78, 66, c)}
            {L(78, 66, 52, 76, c)}
            {P("M 44 76 Q 50 80 56 76", c)}
            {ground(c, 82)}
        </>
    ),

    hip_90_90: (c) => (
        <>
            {H(50, 15, c)}
            {L(50, 22, 50, 52, c)}
            {L(50, 32, 30, 44, c)}
            {L(50, 32, 70, 44, c)}
            {L(50, 52, 22, 52, c)}
            {L(22, 52, 18, 70, c)}
            {L(50, 52, 72, 52, c)}
            {L(72, 52, 78, 70, c)}
            {ground(c, 75)}
        </>
    ),

    ham_standing_forward_fold: (c) => (
        <>
            {H(82, 48, c)}
            {L(50, 48, 75, 48, c)}
            {L(50, 48, 42, 78, c)}
            {L(50, 48, 58, 78, c)}
            {L(65, 48, 60, 68, c)}
            {L(70, 48, 66, 68, c)}
            {ground(c, 80)}
        </>
    ),

    ham_seated_forward_fold: (c) => (
        <>
            {H(72, 45, c)}
            {L(55, 50, 65, 45, c)}
            {L(55, 50, 40, 58, c)}
            {L(40, 58, 88, 60, c)}
            {L(62, 47, 86, 57, c)}
            {ground(c, 68)}
        </>
    ),

    ham_lying_leg_raise: (c) => lyingBack(c, (
        <>
            {L(65, 50, 65, 18, c)}
            {L(65, 50, 85, 52, c)}
            {L(35, 50, 30, 58, c)}
            {L(45, 50, 40, 58, c)}
        </>
    )),

    ham_doorway_hamstring: (c) => lyingBack(c, (
        <>
            {L(62, 50, 62, 15, c)}
            {P("M 56 15 L 68 15", c)}
            {P("M 68 10 L 68 62", c)}
            {L(62, 50, 82, 52, c)}
        </>
    )),

    ham_supine_single_leg: (c) => lyingBack(c, (
        <>
            {L(62, 50, 55, 22, c)}
            {L(38, 50, 50, 24, c)}
            {L(45, 50, 54, 26, c)}
            {L(62, 50, 84, 53, c)}
        </>
    )),

    quad_standing_pull: (c) => (
        <>
            {stand(c, {
                llx: 42, lly: 80,
                rlx: 58, rly: 45,
                rax: 62, ray: 48,
            })}
            {L(58, 45, 65, 38, c)}
        </>
    ),

    quad_prone_pull: (c) => (
        <>
            {H(16, 52, c)}
            {L(23, 52, 68, 55, c)}
            {L(68, 55, 65, 38, c)}
            {L(38, 53, 62, 40, c)}
            {L(68, 55, 86, 57, c)}
            {ground(c, 62)}
        </>
    ),

    quad_kneeling_lunge: (c) => (
        <>
            {H(35, 18, c)}
            {L(35, 25, 40, 52, c)}
            {L(35, 32, 20, 43, c)}
            {L(35, 32, 50, 43, c)}
            {L(40, 52, 14, 52, c)}
            {L(14, 52, 10, 70, c)}
            {L(40, 52, 65, 55, c)}
            {L(65, 55, 68, 70, c)}
            {ground(c, 70)}
        </>
    ),

    quad_heros_pose: (c) => (
        <>
            {H(50, 15, c)}
            {L(50, 22, 50, 52, c)}
            {L(50, 30, 32, 48, c)}
            {L(50, 30, 68, 48, c)}
            {L(50, 52, 28, 60, c)}
            {L(28, 60, 22, 75, c)}
            {L(50, 52, 72, 60, c)}
            {L(72, 60, 78, 75, c)}
            {P("M 18 75 Q 50 82 82 75", c)}
            {ground(c, 82)}
        </>
    ),

    glute_figure_four: (c) => lyingBack(c, (
        <>
            {L(65, 50, 60, 32, c)}
            {L(60, 32, 48, 30, c)}
            {L(65, 50, 80, 36, c)}
            {L(80, 36, 58, 28, c)}
            {L(38, 50, 58, 30, c)}
        </>
    )),

    glute_seated_cross_leg: (c) => (
        <>
            {H(50, 15, c)}
            {L(50, 22, 48, 52, c)}
            {L(50, 32, 28, 48, c)}
            {L(50, 32, 68, 48, c)}
            {L(48, 52, 22, 62, c)}
            {L(48, 52, 72, 52, c)}
            {L(72, 52, 50, 42, c)}
            {ground(c, 70)}
        </>
    ),

    glute_pigeon: (c) => (
        <>
            {H(28, 28, c)}
            {L(28, 35, 46, 52, c)}
            {L(46, 52, 22, 56, c)}
            {L(22, 56, 18, 70, c)}
            {L(46, 52, 76, 56, c)}
            {L(76, 56, 80, 70, c)}
            {L(33, 42, 12, 52, c)}
            {L(30, 42, 10, 48, c)}
            {ground(c, 70)}
        </>
    ),

    glute_supine_twist: (c) => (
        <>
            {H(14, 46, c)}
            {L(21, 46, 62, 46, c)}
            {L(32, 46, 25, 35, c)}
            {L(42, 46, 36, 35, c)}
            {L(62, 46, 72, 58, c)}
            {L(72, 58, 78, 70, c)}
            {L(62, 46, 80, 54, c)}
            {L(80, 54, 84, 66, c)}
            {ground(c, 58)}
        </>
    ),

    calf_wall_calf_raise: (c) => (
        <>
            {stand(c, {
                rax: 82, ray: 22,
                lax: 78, lay: 28,
            })}
            {P("M 88 5 L 88 82", c)}
            {L(50, 52, 62, 85, c)}
        </>
    ),

    calf_downward_dog: (c) => (
        <>
            {H(28, 52, c)}
            {L(22, 58, 18, 75, c)}
            {L(22, 58, 50, 22, c)}
            {L(50, 22, 78, 58, c)}
            {L(78, 58, 82, 75, c)}
            {ground(c, 75)}
        </>
    ),

    calf_step_drop: (c) => (
        <>
            {stand(c, {
                llx: 40, lly: 80,
                rlx: 62, rly: 88,
            })}
            {P("M 28 78 L 72 78", c)}
            {P("M 60 78 L 60 90", c)}
        </>
    ),

    calf_seated_towel: (c) => (
        <>
            {H(18, 45, c)}
            {L(25, 45, 38, 58, c)}
            {L(38, 58, 85, 60, c)}
            {P("M 80 55 Q 88 60 80 65", c)}
            {L(28, 48, 76, 53, c)}
            {L(30, 50, 78, 60, c)}
            {L(38, 58, 40, 75, c)}
            {ground(c, 72)}
        </>
    ),

    it_standing_cross: (c) => (
        <>
            {H(58, 12, c)}
            {L(54, 19, 42, 52, c)}
            {L(52, 28, 72, 10, c)}
            {L(52, 28, 30, 42, c)}
            {L(42, 52, 30, 80, c)}
            {L(42, 52, 54, 80, c)}
        </>
    ),

    it_foam_roller: (c) => (
        <>
            {H(14, 40, c)}
            {L(21, 44, 74, 60, c)}
            {L(30, 48, 18, 32, c)}
            {L(74, 60, 84, 50, c)}
            {L(74, 60, 86, 66, c)}
            {P("M 48 60 Q 52 70 62 60", c)}
            {P("M 48 60 Q 52 50 62 60", c)}
            {ground(c, 70)}
        </>
    ),

    it_lying_cross_over: (c) => lyingBack(c, (
        <>
            {L(32, 50, 25, 40, c)}
            {L(40, 50, 34, 40, c)}
            {L(65, 50, 40, 35, c)}
            {L(65, 50, 85, 52, c)}
        </>
    )),

    it_figure_four_side: (c) => (
        <>
            {H(55, 15, c)}
            {L(52, 22, 44, 52, c)}
            {L(52, 30, 70, 12, c)}
            {L(52, 30, 28, 42, c)}
            {L(44, 52, 18, 60, c)}
            {L(44, 52, 68, 56, c)}
            {L(68, 56, 46, 44, c)}
            {ground(c, 68)}
        </>
    ),
};

// Fallback — generic standing figure
const Fallback: FC<{ c: string }> = ({ c }) => (
    <>
        {H(50, 12, c)}
        {L(50, 19, 50, 52, c)}
        {L(50, 28, 27, 45, c)}
        {L(50, 28, 73, 45, c)}
        {L(50, 52, 38, 80, c)}
        {L(50, 52, 62, 80, c)}
    </>
);

export const StretchIllustration: FC<Props> = ({ stretchId, size = 80, color = "#888" }) => {
    const photo = getImageForStretchId(stretchId);

    if (photo) {
        return (
            <View style={{ width: size, height: size, borderRadius: size * 0.15, overflow: "hidden" }}>
                <Image
                    source={photo}
                    style={{ width: size, height: size }}
                    resizeMode="cover"
                />
            </View>
        );
    }

    const draw = ILL[stretchId];
    return (
        <Svg width={size} height={size} viewBox="0 0 100 100">
            {draw ? draw(color) : <Fallback c={color} />}
        </Svg>
    );
};
