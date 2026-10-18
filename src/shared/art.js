// ===== Zooku art: painted field-journal illustrations (ink line + watercolor wash) =====
(() => {
  const I = '#2f3a2c';               // ink
  const P = '#fbf6ea';               // card paper
  const line = (w = 1.5) => `stroke="${I}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

  const ART = {
    // ---------- reef ----------
    shark: `
      <g ${line()}>
        <path d="M10 34 L3 24 L5 34 L3 45 Z" fill="#9fb3c2"/>
        <path d="M27 25 L33 12 L38 25 Z" fill="#9fb3c2"/>
        <path d="M8 34 C16 23 38 21 54 29 C59 31 60 35 55 38 C40 46 18 46 8 34 Z" fill="#aabdcb"/>
        <path d="M30 40 L25 50 L37 42 Z" fill="#8ea3b3"/>
      </g>
      <path d="M16 38 C26 43.5 44 43.5 53 37.5 C44 40.5 27 41.5 16 38 Z" fill="#f4f1ea"/>
      <path d="M31.3 15 L33 11.6 L34.7 15 Z" fill="${I}"/>
      <circle cx="47" cy="30.5" r="1.8" fill="${I}"/>
      <path d="M39 30 V35.5 M42 29.5 V35" ${line(1)}/>`,
    clown: `
      <g ${line()}>
        <path d="M14 32 L4 22 L6 32 L4 42 Z" fill="#ef8e4a"/>
        <path d="M24 21 Q32 12 41 21 Z" fill="#ef8e4a"/>
        <ellipse cx="32" cy="32" rx="20" ry="13" fill="#f29a58"/>
        <path d="M21 21 Q25.5 32 21 43 L26.5 44.4 Q31 32 26.5 19.6 Z" fill="${P}"/>
        <path d="M37 20.6 Q41 32 37 43.4 L41.5 42 Q45.5 32 41.5 22 Z" fill="${P}"/>
      </g>
      <circle cx="46" cy="29" r="2" fill="${I}"/>`,
    damsel: `
      <g ${line()}>
        <path d="M15 32 L5 23 L8 32 L5 41 Z" fill="#f0cf5a"/>
        <path d="M24 22 Q33 14 42 22 Z" fill="#5f8fcc"/>
        <ellipse cx="33" cy="32" rx="18" ry="12" fill="#77a5dc"/>
      </g>
      <path d="M22 37 Q33 43 46 37 Q34 40 22 37 Z" fill="#f0cf5a"/>
      <circle cx="44" cy="29.5" r="1.9" fill="${I}"/>`,
    parrot: `
      <g ${line()}>
        <path d="M13 33 L3 23 L6 33 L3 43 Z" fill="#e893b3"/>
        <path d="M24 21 Q33 13 43 21 Z" fill="#e893b3"/>
        <ellipse cx="32" cy="33" rx="20" ry="13.5" fill="#71c4ab"/>
        <path d="M49 30 Q57 32 52 38 Q50 35 49 30 Z" fill="#f2e6a6"/>
      </g>
      <path d="M22 28 q3 3 0 6 M28 26 q3 4 0 8 M34 26 q3 4 0 8 M28 35 q3 4 0 7" ${line(1)} fill="none" opacity="0.7"/>
      <circle cx="44" cy="30" r="1.9" fill="${I}"/>`,
    butterfly: `
      <g ${line()}>
        <path d="M17 32 L8 25 L10 32 L8 39 Z" fill="#f2d35c"/>
        <ellipse cx="32" cy="32" rx="16" ry="17" fill="#f4d968"/>
        <path d="M47 30 L56 31.5 L47 34 Z" fill="#f2d35c"/>
      </g>
      <path d="M40 16.5 Q43 32 40 47.5" stroke="${I}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
      <circle cx="41.5" cy="28" r="2.2" fill="${P}" stroke="${I}" stroke-width="1"/>
      <circle cx="41.7" cy="28" r="0.9" fill="${I}"/>
      <circle cx="23" cy="37" r="3.2" fill="${I}"/>
      <circle cx="23" cy="37" r="5" fill="none" stroke="${P}" stroke-width="1.4"/>`,
    // ---------- savanna ----------
    lion: `
      <g ${line()}>
        <polygon points="59,32 52.3,40.4 51.1,51.1 40.4,52.3 32,59 23.6,52.3 12.9,51.1 11.7,40.4 5,32 11.7,23.6 12.9,12.9 23.6,11.7 32,5 40.4,11.7 51.1,12.9 52.3,23.6" fill="#c7843f" fill-opacity="0.85"/>
        <circle cx="21" cy="21" r="5" fill="#e3b878"/><circle cx="43" cy="21" r="5" fill="#e3b878"/>
        <circle cx="32" cy="34" r="15" fill="#eecb92"/>
        <ellipse cx="32" cy="41" rx="7.5" ry="5.5" fill="#fbf1dc"/>
      </g>
      <path d="M10 26 L15 28 M8 36 L14 35 M54 26 L49 28 M56 36 L50 35 M20 52 L23 48 M44 52 L41 48" ${line(0.9)} opacity="0.6"/>
      <circle cx="26" cy="31" r="1.8" fill="${I}"/><circle cx="38" cy="31" r="1.8" fill="${I}"/>
      <path d="M29 37 L35 37 L32 40 Z" fill="${I}"/>`,
    zebra: `
      <g ${line()}>
        <path d="M23 15 L19 3 L29 11 Z" fill="${P}"/><path d="M41 15 L45 3 L35 11 Z" fill="${P}"/>
        <path d="M21 16 C21 7 43 7 43 16 L41 46 C41 57 23 57 23 46 Z" fill="${P}"/>
      </g>
      <g fill="${I}"><path d="M28 9 Q32 2 36 9 Z"/><path d="M22 20 Q32 24 42.6 20 L42.4 24 Q32 28 22.2 24 Z"/><path d="M22.6 33 Q32 36.5 41.6 33 L41.4 36.5 Q32 40 22.8 36.5 Z"/><circle cx="27" cy="29" r="1.8"/><circle cx="37" cy="29" r="1.8"/></g>
      <ellipse cx="32" cy="47" rx="9" ry="7" fill="#76766f" ${line()}/>`,
    gnu: `
      <g ${line()}>
        <path d="M23 17 C14 15 9 9 13 3 C16 9 21 11 27 12 Z" fill="#efe6d3"/><path d="M41 17 C50 15 55 9 51 3 C48 9 43 11 37 12 Z" fill="#efe6d3"/>
        <path d="M22 16 C22 9 42 9 42 16 L40 46 C40 55 24 55 24 46 Z" fill="#848c96"/>
        <path d="M27 52 Q32 62 37 52 Z" fill="#4a4f57"/>
        <ellipse cx="32" cy="47" rx="8" ry="6" fill="#5a6069"/>
      </g>
      <circle cx="26.5" cy="27" r="1.8" fill="${I}"/><circle cx="37.5" cy="27" r="1.8" fill="${I}"/>
      <circle cx="27.1" cy="26.4" r="0.6" fill="#fff"/><circle cx="38.1" cy="26.4" r="0.6" fill="#fff"/>`,
    gazelle: `
      <path d="M28 14 C25 8 26 4 28.5 1.5 M36 14 C39 8 38 4 35.5 1.5" fill="none" stroke="${I}" stroke-width="2" stroke-linecap="round"/>
      <g ${line()}>
        <path d="M25 19 L13 13 L23 24 Z" fill="#d4a165"/><path d="M39 19 L51 13 L41 24 Z" fill="#d4a165"/>
        <path d="M24 18 C24 11 40 11 40 18 L37 45 C37 53 27 53 27 45 Z" fill="#dcae74"/>
      </g>
      <path d="M30.5 16 L33.5 16 L33 44 L31 44 Z" fill="#fbf1dc"/>
      <path d="M26.5 27 L29.5 41 M37.5 27 L34.5 41" ${line(1.6)} fill="none"/>
      <circle cx="26.5" cy="26" r="1.8" fill="${I}"/><circle cx="37.5" cy="26" r="1.8" fill="${I}"/>
      <ellipse cx="32" cy="47" rx="2.6" ry="1.8" fill="${I}"/>`,
    buffalo: `
      <g ${line()}>
        <path d="M6 26 C5 13 20 11 32 16 C44 11 59 13 58 26 C54 20 46 19 39 23 L25 23 C18 19 10 20 6 26 Z" fill="#a59c8f"/>
        <path d="M21 21 C21 16 43 16 43 21 L41 45 C41 55 23 55 23 45 Z" fill="#6a5d52"/>
        <ellipse cx="32" cy="47" rx="9" ry="7" fill="#8a7b6e"/>
      </g>
      <circle cx="27" cy="31" r="1.9" fill="#f4ead2"/><circle cx="37" cy="31" r="1.9" fill="#f4ead2"/>
      <circle cx="27.2" cy="31" r="0.9" fill="${I}"/><circle cx="37.2" cy="31" r="0.9" fill="${I}"/>`,
    // ---------- backyard at night ----------
    owl: `
      <g ${line()}>
        <path d="M32 6 C46 6 56 16 56 32 C56 48 46 58 32 58 C18 58 8 48 8 32 C8 16 18 6 32 6 Z" fill="#d9a865"/>
        <path d="M32 14 C40 10 50 16 49 28 C48 40 40 50 32 54 C24 50 16 40 15 28 C14 16 24 10 32 14 Z" fill="#fbf3e6"/>
      </g>
      <g fill="${I}" opacity="0.45"><circle cx="13" cy="22" r="0.9"/><circle cx="51" cy="22" r="0.9"/><circle cx="12" cy="40" r="0.9"/><circle cx="52" cy="40" r="0.9"/><circle cx="20" cy="52" r="0.9"/><circle cx="44" cy="52" r="0.9"/></g>
      <circle cx="25" cy="30" r="3.2" fill="${I}"/><circle cx="39" cy="30" r="3.2" fill="${I}"/>
      <circle cx="25.9" cy="29.1" r="0.9" fill="#fff"/><circle cx="39.9" cy="29.1" r="0.9" fill="#fff"/>
      <path d="M32 34 L29.5 40 L32 44 L34.5 40 Z" fill="#cba57a" ${line(1.1)}/>`,
    mouse: `
      <g ${line()}><circle cx="17" cy="20" r="10" fill="#c29a70"/><circle cx="47" cy="20" r="10" fill="#c29a70"/></g>
      <circle cx="17" cy="21" r="5.5" fill="#e8b9a8"/><circle cx="47" cy="21" r="5.5" fill="#e8b9a8"/>
      <path d="M32 18 C46 18 52 30 48 40 C45 48 38 54 32 56 C26 54 19 48 16 40 C12 30 18 18 32 18 Z" fill="#b08a62" ${line()}/>
      <ellipse cx="32" cy="47" rx="7" ry="6" fill="#e2c6a2"/>
      <circle cx="25" cy="33" r="3" fill="${I}"/><circle cx="39" cy="33" r="3" fill="${I}"/>
      <circle cx="25.8" cy="32.2" r="0.8" fill="#fff"/><circle cx="39.8" cy="32.2" r="0.8" fill="#fff"/>
      <circle cx="32" cy="51" r="2" fill="#d98f8f" ${line(1)}/>
      <path d="M28 49 L15 46 M28 51 L16 53 M36 49 L49 46 M36 51 L48 53" ${line(0.7)}/>`,
    vole: `
      <g ${line()}><circle cx="20" cy="22" r="5" fill="#8d7a62"/><circle cx="44" cy="22" r="5" fill="#8d7a62"/></g>
      <path d="M32 16 C47 16 54 28 52 38 C50 48 42 54 32 54 C22 54 14 48 12 38 C10 28 17 16 32 16 Z" fill="#9a8468" ${line()}/>
      <ellipse cx="32" cy="45" rx="8" ry="6" fill="#bba88a"/>
      <circle cx="25" cy="33" r="2.1" fill="${I}"/><circle cx="39" cy="33" r="2.1" fill="${I}"/>
      <circle cx="32" cy="44" r="1.8" fill="${I}"/>
      <path d="M28 46 L18 44 M28 48 L19 50 M36 46 L46 44 M36 48 L45 50" ${line(0.7)}/>`,
    shrew: `
      <g ${line()}><circle cx="19" cy="22" r="4" fill="#5e4a3a"/><circle cx="45" cy="22" r="4" fill="#5e4a3a"/></g>
      <path d="M32 14 C45 14 51 24 48 33 C46 40 38 50 34 59 L30 59 C26 50 18 40 16 33 C13 24 19 14 32 14 Z" fill="#6f5846" ${line()}/>
      <path d="M26 38 C29 44 35 44 38 38 C36 46 34 52 32 56 C30 52 28 46 26 38 Z" fill="#9c8470" opacity="0.8"/>
      <circle cx="25" cy="29" r="1.6" fill="${I}"/><circle cx="39" cy="29" r="1.6" fill="${I}"/>
      <ellipse cx="32" cy="59.5" rx="2.6" ry="1.8" fill="#d98f8f" ${line(1)}/>
      <path d="M30 52 L20 49 M30 54 L21 56 M34 52 L44 49 M34 54 L43 56" ${line(0.7)}/>`,
    dormouse: `
      <g ${line()}><circle cx="18" cy="20" r="8" fill="#d9a04a"/><circle cx="46" cy="20" r="8" fill="#d9a04a"/></g>
      <circle cx="18" cy="21" r="4.5" fill="#efc0a8"/><circle cx="46" cy="21" r="4.5" fill="#efc0a8"/>
      <path d="M32 16 C47 16 54 28 51 39 C48 49 40 55 32 55 C24 55 16 49 13 39 C10 28 17 16 32 16 Z" fill="#e3ad55" ${line()}/>
      <ellipse cx="32" cy="44" rx="9" ry="7" fill="#f6dfb0"/>
      <circle cx="24" cy="33" r="3.8" fill="${I}"/><circle cx="40" cy="33" r="3.8" fill="${I}"/>
      <circle cx="25.2" cy="31.8" r="1.2" fill="#fff"/><circle cx="41.2" cy="31.8" r="1.2" fill="#fff"/>
      <circle cx="32" cy="43" r="1.8" fill="#a8664a"/>`,
    cat: `
      <g ${line()}>
        <path d="M14 26 L12 8 L26 18 Z" fill="#9a9a94"/><path d="M50 26 L52 8 L38 18 Z" fill="#9a9a94"/>
        <path d="M32 14 C48 14 56 26 54 38 C52 50 42 56 32 56 C22 56 12 50 10 38 C8 26 16 14 32 14 Z" fill="#a8a8a2"/>
      </g>
      <ellipse cx="24" cy="34" rx="3" ry="3.6" fill="#c9c06a" ${line(1)}/><ellipse cx="40" cy="34" rx="3" ry="3.6" fill="#c9c06a" ${line(1)}/>
      <path d="M24 31 V37 M40 31 V37" ${line(1.2)}/>
      <path d="M30 42 L34 42 L32 44.5 Z" fill="#d98f8f"/>`,
    // ---------- antarctic ice edge ----------
    leopard: `
      <g ${line()}>
        <path d="M9 40 L1 33 L4 41 L1 49 Z" fill="#8c96a0"/>
        <path d="M8 40 C12 31 26 27 40 27.5 C49 28 56 30 59.5 34 C61 36.5 59 39.5 55 39.8 C50 40.4 46 41.5 42 42.5 C30 46 17 46.5 8 40 Z" fill="#a3adb6"/>
        <path d="M31 42.5 L24 52 L37 44.5 Z" fill="#8c96a0"/>
      </g>
      <path d="M15 42.5 C26 46 40 45 50 40.5 C42 42 28 43.5 15 42.5 Z" fill="#dde2e6"/>
      <path d="M47 37.2 Q53.5 38.6 59 36" ${line(1.2)} fill="none"/>
      <circle cx="51" cy="32" r="1.8" fill="${I}"/>
      <path d="M55 35.5 L62 33.5 M55.5 36.8 L62 37" ${line(0.7)}/>
      <g fill="${I}" opacity="0.55"><circle cx="22" cy="34" r="1.1"/><circle cx="28" cy="31.5" r="0.9"/><circle cx="33" cy="35" r="1.2"/><circle cx="18" cy="38.5" r="0.9"/><circle cx="39" cy="31" r="0.9"/><circle cx="26" cy="38.5" r="1"/><circle cx="43" cy="35" r="0.8"/></g>`,
    emperor: `
      <g ${line()}>
        <path d="M32 4 C41 4 45 13 45 23 C48 36 47 50 42 57 L22 57 C17 50 16 36 19 23 C19 13 23 4 32 4 Z" fill="#3d434b"/>
        <path d="M19 27 C13 33 11 42 13 49 C16 45 18 39 20 35 Z" fill="#3d434b"/><path d="M45 27 C51 33 53 42 51 49 C48 45 46 39 44 35 Z" fill="#3d434b"/>
        <path d="M32 18 C39 18 42 29 42 40 C42 50 38 56 32 56 C26 56 22 50 22 40 C22 29 25 18 32 18 Z" fill="${P}"/>
        <ellipse cx="27" cy="59" rx="4.2" ry="2" fill="#5a5a5a"/><ellipse cx="37" cy="59" rx="4.2" ry="2" fill="#5a5a5a"/>
      </g>
      <path d="M24.5 24 C27 21 37 21 39.5 24 C38 30 26 30 24.5 24 Z" fill="#f2c55c" opacity="0.8"/>
      <path d="M21.5 13 C19.5 17 21 21.5 25 21.5 C24.5 18 23.5 15 21.5 13 Z" fill="#f0a63c" ${line(1)}/>
      <path d="M42.5 13 C44.5 17 43 21.5 39 21.5 C39.5 18 40.5 15 42.5 13 Z" fill="#f0a63c" ${line(1)}/>
      <path d="M31 13 L29.6 22 L32 24.5 L34.4 22 L33 13 Z" fill="#3d434b" ${line(1)}/><path d="M30.2 19.5 L33.8 19.5 L32 24 Z" fill="#ef8a4a"/>
      <circle cx="27.5" cy="11.5" r="1.4" fill="${P}"/><circle cx="36.5" cy="11.5" r="1.4" fill="${P}"/>`,
    adelie: `
      <g ${line()}>
        <path d="M32 7 C42 7 46 15 46 24 C49 36 48 49 43 56 L21 56 C16 49 15 36 18 24 C18 15 22 7 32 7 Z" fill="#33383f"/>
        <path d="M18 28 C12 34 10 42 12 48 C15 44 17 39 19 35 Z" fill="#33383f"/><path d="M46 28 C52 34 54 42 52 48 C49 44 47 39 45 35 Z" fill="#33383f"/>
        <path d="M32 25 C39 25 42 33 42 42 C42 50 38 55 32 55 C26 55 22 50 22 42 C22 33 25 25 32 25 Z" fill="${P}"/>
        <ellipse cx="27" cy="58" rx="4.2" ry="2" fill="#e8a7a0"/><ellipse cx="37" cy="58" rx="4.2" ry="2" fill="#e8a7a0"/>
      </g>
      <circle cx="25.5" cy="16" r="3.4" fill="${P}" ${line(1)}/><circle cx="38.5" cy="16" r="3.4" fill="${P}" ${line(1)}/>
      <circle cx="25.8" cy="16" r="1.5" fill="${I}"/><circle cx="38.2" cy="16" r="1.5" fill="${I}"/>
      <path d="M29.2 19 L34.8 19 L32 25 Z" fill="#7a3f36" ${line(1)}/>`,
    gentoo: `
      <g ${line()}>
        <path d="M32 6 C42 6 46 14 46 24 C49 36 48 49 43 56 L21 56 C16 49 15 36 18 24 C18 14 22 6 32 6 Z" fill="#3a4047"/>
        <path d="M18 28 C12 34 10 42 12 48 C15 44 17 39 19 35 Z" fill="#3a4047"/><path d="M46 28 C52 34 54 42 52 48 C49 44 47 39 45 35 Z" fill="#3a4047"/>
        <path d="M32 25 C39 25 42 33 42 42 C42 50 38 55 32 55 C26 55 22 50 22 42 C22 33 25 25 32 25 Z" fill="${P}"/>
        <ellipse cx="27" cy="58" rx="4.2" ry="2" fill="#ef8a4a"/><ellipse cx="37" cy="58" rx="4.2" ry="2" fill="#ef8a4a"/>
      </g>
      <path d="M21.5 15.5 Q32 6.5 42.5 15.5 L40.5 18.5 Q32 11.5 23.5 18.5 Z" fill="${P}" ${line(1)}/>
      <circle cx="25" cy="19" r="1.5" fill="${I}"/><circle cx="39" cy="19" r="1.5" fill="${I}"/>
      <path d="M28.6 20.5 L35.4 20.5 L32 27 Z" fill="#ef7a36" ${line(1)}/>`,
    chinstrap: `
      <g ${line()}>
        <path d="M32 6 C42 6 46 14 46 24 C49 36 48 49 43 56 L21 56 C16 49 15 36 18 24 C18 14 22 6 32 6 Z" fill="#3a4047"/>
        <path d="M18 28 C12 34 10 42 12 48 C15 44 17 39 19 35 Z" fill="#3a4047"/><path d="M46 28 C52 34 54 42 52 48 C49 44 47 39 45 35 Z" fill="#3a4047"/>
        <path d="M21 16 C25 12.5 39 12.5 43 16 C44 30 41 38 42 44 C42 51 38 55 32 55 C26 55 22 51 22 44 C23 38 20 30 21 16 Z" fill="${P}"/>
        <ellipse cx="27" cy="58" rx="4.2" ry="2" fill="#e8a7a0"/><ellipse cx="37" cy="58" rx="4.2" ry="2" fill="#e8a7a0"/>
      </g>
      <path d="M23 25 Q32 33 41 25" fill="none" stroke="${I}" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="26.5" cy="18.5" r="1.5" fill="${I}"/><circle cx="37.5" cy="18.5" r="1.5" fill="${I}"/>
      <path d="M30 20 L34 20 L32 25 Z" fill="#3a4047"/>`,
    // ---------- lily pond ----------
    heron: `
      <g ${line()}>
        <path d="M12 64 C12 55 22 50 32 51 C44 52 51 58 52 64 Z" fill="#9aa3aa"/>
        <path d="M25 60 C25 47 31 41 29 31 C27 22 31 13 39 13 C45 13 47 17 45 21 C41 25 37 30 38.5 40 C40 48 40 55 39 60 Z" fill="#e9ebe6"/>
        <path d="M44.5 16.5 L63 20 L44.5 21.5 Z" fill="#e8c35a"/>
      </g>
      <path d="M41 14.5 C34 11.5 25 11.5 15 16.5 C25 14.5 33 15.5 39.5 18 Z" fill="${I}"/>
      <circle cx="41.5" cy="16.8" r="1.4" fill="#f2d36b" stroke="${I}" stroke-width="0.8"/>
      <path d="M33 27 l-1 3 M32 33 l-1 3 M33 39 l-1 3 M34 45 l-1 3" ${line(1.3)} opacity="0.7"/>`,
    frog: `
      <g ${line()}>
        <path d="M12 52 C8 54 6 58 9 59 L17 57 M52 52 C56 54 58 58 55 59 L47 57" fill="none"/>
        <circle cx="21" cy="23" r="7.5" fill="#a9a05c"/><circle cx="43" cy="23" r="7.5" fill="#a9a05c"/>
        <path d="M9 41 C9 28 19 22 32 22 C45 22 55 28 55 41 C55 51 45 57 32 57 C19 57 9 51 9 41 Z" fill="#b5ab68"/>
      </g>
      <path d="M12 33 C15 30 18 30 20 32 C18 36 15 37 12 36 Z M52 33 C49 30 46 30 44 32 C46 36 49 37 52 36 Z" fill="#5d4a34" opacity="0.75"/>
      <circle cx="21" cy="22" r="4" fill="#e3c35a" ${line(1)}/><circle cx="43" cy="22" r="4" fill="#e3c35a" ${line(1)}/>
      <ellipse cx="21" cy="22" rx="2.6" ry="1.2" fill="${I}"/><ellipse cx="43" cy="22" rx="2.6" ry="1.2" fill="${I}"/>
      <path d="M17 43 Q32 51 47 43" ${line(1.3)} fill="none"/>
      <g fill="#7a6a42" opacity="0.55"><circle cx="26" cy="33" r="1.6"/><circle cx="38" cy="35" r="1.4"/><circle cx="32" cy="29" r="1.1"/></g>`,
    toad: `
      <g ${line()}>
        <circle cx="21" cy="24" r="7" fill="#a4805a"/><circle cx="43" cy="24" r="7" fill="#a4805a"/>
        <path d="M7 42 C6 30 17 23 32 23 C47 23 58 30 57 42 C56 52 46 58 32 58 C18 58 8 52 7 42 Z" fill="#ad8a62"/>
        <ellipse cx="13.5" cy="33" rx="4" ry="6" fill="#c19c72" transform="rotate(-25 13.5 33)"/><ellipse cx="50.5" cy="33" rx="4" ry="6" fill="#c19c72" transform="rotate(25 50.5 33)"/>
      </g>
      <circle cx="21" cy="23" r="4" fill="#d9883a" ${line(1)}/><circle cx="43" cy="23" r="4" fill="#d9883a" ${line(1)}/>
      <ellipse cx="21" cy="23" rx="2.6" ry="1.1" fill="${I}"/><ellipse cx="43" cy="23" rx="2.6" ry="1.1" fill="${I}"/>
      <path d="M16 44 Q32 51 48 44" ${line(1.3)} fill="none"/>
      <g fill="#7c5a3c" opacity="0.6"><circle cx="24" cy="34" r="1.6"/><circle cx="31" cy="31" r="1.3"/><circle cx="39" cy="34" r="1.7"/><circle cx="20" cy="51" r="1.4"/><circle cx="44" cy="51" r="1.4"/><circle cx="35" cy="38" r="1.1"/><circle cx="28" cy="38" r="1"/></g>`,
    newt: `
      <g ${line()}>
        <path d="M18 42 L15 50 M24 43 L23 51 M42 42 L44 50 M48 41 L51 48" fill="none" stroke-width="1.6"/>
        <path d="M4 37 C10 33 20 31 30 31.5 C40 32 48 30.5 54 33 C59.5 35 59.5 39.5 54 40.5 C46 42 38 42.5 30 42.5 C20 42.5 12 43.5 4 37 Z" fill="#a29266"/>
        <path d="M9 34.5 q2.5 -6 5 -2 q2.5 -6.5 5 -2.5 q2.5 -6.5 5 -2.5 q2.5 -6 5 -2.5 q2.5 -5.5 5 -2 q2.5 -5 5 -1.5" fill="#b9a874"/>
      </g>
      <path d="M17 41.8 C28 45.5 44 44 54 40.5 C46 44.8 30 46.5 17 41.8 Z" fill="#ef9a4a"/>
      <circle cx="51.5" cy="35" r="1.5" fill="${I}"/>
      <g fill="${I}" opacity="0.5"><circle cx="22" cy="36" r="1"/><circle cx="30" cy="38" r="1.2"/><circle cx="38" cy="36" r="1"/><circle cx="44" cy="38.5" r="0.9"/><circle cx="14" cy="38" r="0.9"/></g>`,
    treefrog: `
      <g ${line()}>
        <path d="M14 51 C10 53 8 57 11 58 M50 51 C54 53 56 57 53 58" fill="none"/>
        <circle cx="21" cy="23" r="8" fill="#7cbf58"/><circle cx="43" cy="23" r="8" fill="#7cbf58"/>
        <path d="M11 41 C11 29 20 23 32 23 C44 23 53 29 53 41 C53 51 44 56 32 56 C20 56 11 51 11 41 Z" fill="#86c962"/>
      </g>
      <g fill="#86c962" ${line(1)}><circle cx="9.5" cy="58.5" r="2.4"/><circle cx="54.5" cy="58.5" r="2.4"/></g>
      <path d="M13 31 C17 36 19 44 22 52 M51 31 C47 36 45 44 42 52" stroke="#5a4636" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.8"/>
      <circle cx="21" cy="22" r="4.6" fill="#e9c24a" ${line(1)}/><circle cx="43" cy="22" r="4.6" fill="#e9c24a" ${line(1)}/>
      <ellipse cx="21" cy="22" rx="3" ry="1.4" fill="${I}"/><ellipse cx="43" cy="22" rx="3" ry="1.4" fill="${I}"/>
      <path d="M18 42 Q32 49 46 42" ${line(1.3)} fill="none"/>`,
    // ---------- rainforest canopy ----------
    harpy: `
      <g ${line()}>
        <path d="M20 14 L14 3 L26 11 Z M44 14 L50 3 L38 11 Z" fill="#6b6e73"/>
        <path d="M32 9 C46 9 54 20 53 33 C52 44 44 50 32 50 C20 50 12 44 11 33 C10 20 18 9 32 9 Z" fill="#b3b7bb"/>
        <path d="M10 64 C10 52 20 46 32 46 C44 46 54 52 54 64 Z" fill="#3c3d42"/>
      </g>
      <path d="M17 29 C19 22 27 20 31 26 C27 25 22 26 17 29 Z M47 29 C45 22 37 20 33 26 C37 25 42 26 47 29 Z" fill="#7d8186"/>
      <circle cx="24" cy="30" r="3.4" fill="#e8c96a" ${line(1)}/><circle cx="40" cy="30" r="3.4" fill="#e8c96a" ${line(1)}/>
      <circle cx="24" cy="30" r="1.7" fill="${I}"/><circle cx="40" cy="30" r="1.7" fill="${I}"/>
      <path d="M32 30 C36.5 30 38.5 34.5 35.5 40 L32 45 L28.5 40 C25.5 34.5 27.5 30 32 30 Z" fill="#3e3f45" ${line(1.2)}/>
      <path d="M22 58 l3 3 M30 57 l2 3.5 M38 57 l2 3.5 M46 58 l2 3" stroke="#e9e6dc" stroke-width="1.2" stroke-linecap="round" opacity="0.8"/>`,
    tamarin: `
      <g ${line()}>
        <path d="M13 26 C8 12 22 1 32 6 C42 1 56 12 51 26 C46 19 39 16 32 17 C25 16 18 19 13 26 Z" fill="${P}"/>
        <path d="M32 17 C43 17 49 26 48 37 C47 48 40 55 32 55 C24 55 17 48 16 37 C15 26 21 17 32 17 Z" fill="#a0744c"/>
        <path d="M32 22 C40 22 43 29 42 37 C41 45 37 50 32 50 C27 50 23 45 22 37 C21 29 24 22 32 22 Z" fill="#4a403a"/>
      </g>
      <path d="M17 38 C14 44 15 50 19 53 M47 38 C50 44 49 50 45 53" stroke="${P}" stroke-width="2.4" fill="none" stroke-linecap="round" opacity="0.9"/>
      <circle cx="27" cy="33" r="2.4" fill="#d3a35a"/><circle cx="37" cy="33" r="2.4" fill="#d3a35a"/>
      <circle cx="27" cy="33" r="1.2" fill="${I}"/><circle cx="37" cy="33" r="1.2" fill="${I}"/>
      <path d="M30 41 L34 41 M29.5 45 Q32 46.5 34.5 45" stroke="#2a2420" stroke-width="1.1" fill="none" stroke-linecap="round"/>`,
    howler: `
      <g ${line()}>
        <path d="M32 6 C47 6 56 18 55 32 C54 47 45 58 32 58 C19 58 10 47 9 32 C8 18 17 6 32 6 Z" fill="#4a3a2e"/>
        <path d="M32 16 C41 16 46 23 46 31 C46 41 40 51 32 52 C24 51 18 41 18 31 C18 23 23 16 32 16 Z" fill="#2f2620"/>
      </g>
      <path d="M10 36 C14 44 20 52 28 57 M54 36 C50 44 44 52 36 57" stroke="#c99a52" stroke-width="2.6" fill="none" stroke-linecap="round" opacity="0.75"/>
      <circle cx="26" cy="28" r="2.2" fill="#d3a35a"/><circle cx="38" cy="28" r="2.2" fill="#d3a35a"/>
      <circle cx="26" cy="28" r="1.1" fill="${I}"/><circle cx="38" cy="28" r="1.1" fill="${I}"/>
      <path d="M29.5 35 L34.5 35" stroke="#7a6658" stroke-width="1.4" stroke-linecap="round"/>
      <ellipse cx="32" cy="44" rx="4.6" ry="5.6" fill="#7a2f2a" stroke="#c6a98a" stroke-width="1"/>`,
    capuchin: `
      <g ${line()}>
        <path d="M32 5 C47 5 56 17 55 31 C54 46 45 57 32 57 C19 57 10 46 9 31 C8 17 17 5 32 5 Z" fill="#33302c"/>
        <path d="M32 14 C44 14 50 23 49 34 C48 46 41 54 32 54 C23 54 16 46 15 34 C14 23 20 14 32 14 Z" fill="#f2e6cc"/>
        <path d="M19 19 C23 10 41 10 45 19 C41 17 36.5 16 32 19 C27.5 16 23 17 19 19 Z" fill="#33302c"/>
        <path d="M32 26 C38 26 41 31 40.5 37 C40 44 36.5 48 32 48 C27.5 48 24 44 23.5 37 C23 31 26 26 32 26 Z" fill="#e7b9a2"/>
      </g>
      <circle cx="27.5" cy="32" r="2.2" fill="#6b4a32"/><circle cx="36.5" cy="32" r="2.2" fill="#6b4a32"/>
      <circle cx="27.8" cy="31.6" r="0.7" fill="#fff"/><circle cx="36.8" cy="31.6" r="0.7" fill="#fff"/>
      <path d="M30.5 38.5 L33.5 38.5 M29 43 Q32 44.6 35 43" stroke="#6b4a3a" stroke-width="1.1" fill="none" stroke-linecap="round"/>`,
    spider: `
      <path d="M44 50 C57 47 61 30 53 22 C49 18.5 44 21 46 25.5 C47 27.5 49.5 27 49.5 25" stroke="${I}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <path d="M44 50 C57 47 61 30 53 22 C49 18.5 44 21 46 25.5 C47 27.5 49.5 27 49.5 25" stroke="#c99a5c" stroke-width="1.1" fill="none" stroke-linecap="round"/>
      <g ${line()}>
        <circle cx="16" cy="25" r="5" fill="#b9874e"/><circle cx="48" cy="25" r="5" fill="#b9874e"/>
        <path d="M32 9 C44 9 50 18 49 30 C48 42 41 52 32 52 C23 52 16 42 15 30 C14 18 20 9 32 9 Z" fill="#c99a5c"/>
        <path d="M32 18 C39 18 42 23 42 30 C42 39 37 46 32 46 C27 46 22 39 22 30 C22 23 25 18 32 18 Z" fill="#3a2e26"/>
      </g>
      <circle cx="27" cy="28" r="3.3" fill="#e7cfa8"/><circle cx="37" cy="28" r="3.3" fill="#e7cfa8"/>
      <circle cx="27" cy="28" r="1.5" fill="${I}"/><circle cx="37" cy="28" r="1.5" fill="${I}"/>
      <ellipse cx="32" cy="40" rx="5.4" ry="4.4" fill="#e7cfa8"/>
      <path d="M30.6 38.5 L33.4 38.5 M30 42 Q32 43.2 34 42" stroke="#4a3a30" stroke-width="1" fill="none" stroke-linecap="round"/>`,
    // ---------- outback ----------
    dingo: `
      <g ${line()}>
        <path d="M20 22 L15 4 L29 15 Z" fill="#d9964f"/><path d="M44 22 L49 4 L35 15 Z" fill="#d9964f"/>
        <path d="M32 12 C44 12 51 20 50 30 C49 40 42 46 38 54 L26 54 C22 46 15 40 14 30 C13 20 20 12 32 12 Z" fill="#e1a35c"/>
        <path d="M22 37 C26 43 29 49 30 55 L34 55 C35 49 38 43 42 37 C38 40 26 40 22 37 Z" fill="#f6e5c8"/>
      </g>
      <path d="M19 10 L26 16 M45 10 L38 16" stroke="#f6e5c8" stroke-width="2" stroke-linecap="round" opacity="0.8"/>
      <circle cx="25.5" cy="28" r="1.9" fill="${I}"/><circle cx="38.5" cy="28" r="1.9" fill="${I}"/>
      <ellipse cx="32" cy="52" rx="3.4" ry="2.4" fill="${I}"/>`,
    roo: `
      <g ${line()}>
        <path d="M24 22 C17 13 16 4 19 1.5 C24 4 27 12 28 19 Z" fill="#c8754a"/><path d="M40 22 C47 13 48 4 45 1.5 C40 4 37 12 36 19 Z" fill="#c8754a"/>
        <path d="M32 15 C42 15 47 22 46 30 C45 38 41 43 39 52 C38 57 26 57 25 52 C23 43 19 38 18 30 C17 22 22 15 32 15 Z" fill="#cf7f52"/>
        <path d="M26 44 C27 51 29 56 32 56 C35 56 37 51 38 44 C35 46 29 46 26 44 Z" fill="#f2dcc4"/>
      </g>
      <path d="M21.5 8 C22.5 12 24 15 25.5 18 M42.5 8 C41.5 12 40 15 38.5 18" stroke="#f2c7b0" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M22 33 C25 36 26 39 26 42 M42 33 C39 36 38 39 38 42" stroke="#fbf1dc" stroke-width="1.8" fill="none" stroke-linecap="round" opacity="0.85"/>
      <circle cx="26" cy="28" r="2" fill="${I}"/><circle cx="38" cy="28" r="2" fill="${I}"/>
      <circle cx="26.6" cy="27.4" r="0.6" fill="#fff"/><circle cx="38.6" cy="27.4" r="0.6" fill="#fff"/>
      <path d="M29 50 C30.5 52 33.5 52 35 50 L32 48 Z" fill="${I}"/>`,
    wallaby: `
      <g ${line()}>
        <ellipse cx="20" cy="14" rx="5.5" ry="9" fill="#8a8072" transform="rotate(-18 20 14)"/><ellipse cx="44" cy="14" rx="5.5" ry="9" fill="#8a8072" transform="rotate(18 44 14)"/>
        <path d="M32 16 C43 16 49 24 48 33 C47 42 42 48 39 55 L25 55 C22 48 17 42 16 33 C15 24 21 16 32 16 Z" fill="#978c7e"/>
      </g>
      <ellipse cx="20" cy="14.5" rx="2.6" ry="5.5" fill="#d9b5a0" transform="rotate(-18 20 14.5)"/><ellipse cx="44" cy="14.5" rx="2.6" ry="5.5" fill="#d9b5a0" transform="rotate(18 44 14.5)"/>
      <path d="M19 38 C23 40 26 43 28 47 M45 38 C41 40 38 43 36 47" stroke="#fbf1dc" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <path d="M32 18 L32 27" stroke="#4e463e" stroke-width="2.4" stroke-linecap="round" opacity="0.6"/>
      <circle cx="26" cy="31" r="2" fill="${I}"/><circle cx="38" cy="31" r="2" fill="${I}"/>
      <path d="M29 51 C30.5 53 33.5 53 35 51 L32 49 Z" fill="${I}"/>`,
    wombat: `
      <g ${line()}><circle cx="15" cy="20" r="5" fill="#8c7c69"/><circle cx="49" cy="20" r="5" fill="#8c7c69"/></g>
      <path d="M32 14 C48 14 57 25 56 38 C55 50 45 57 32 57 C19 57 9 50 8 38 C7 25 16 14 32 14 Z" fill="#a08f7a" ${line()}/>
      <path d="M22 41 C22 35 26 33 32 33 C38 33 42 35 42 41 C42 47 38 50 32 50 C26 50 22 47 22 41 Z" fill="#c9b9a2" ${line(1.2)}/>
      <path d="M27 40 C27 38 29 37 32 37 C35 37 37 38 37 40 C37 42 35 43.5 32 43.5 C29 43.5 27 42 27 40 Z" fill="#5a4c40"/>
      <circle cx="23" cy="28" r="1.8" fill="${I}"/><circle cx="41" cy="28" r="1.8" fill="${I}"/>
      <path d="M29 47 Q32 48.5 35 47" ${line(1)} fill="none"/>`,
    bilby: `
      <g ${line()}>
        <path d="M24 26 C15 18 11 6 14 2 C20 4 26 14 28 22 Z" fill="#a8a6ad"/><path d="M40 26 C49 18 53 6 50 2 C44 4 38 14 36 22 Z" fill="#a8a6ad"/>
        <path d="M32 20 C42 20 47 27 46 34 C45 41 39 46 35 56 C34 59 30 59 29 56 C25 46 19 41 18 34 C17 27 22 20 32 20 Z" fill="#b3b1b8"/>
      </g>
      <path d="M16.5 6 C19 10 23 16 25.5 21 M47.5 6 C45 10 41 16 38.5 21" stroke="#e9b8b2" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <path d="M27 42 C29 48 30.5 53 32 56 C33.5 53 35 48 37 42 C35 44 29 44 27 42 Z" fill="#ece6dc" opacity="0.9"/>
      <circle cx="26.5" cy="31" r="2.2" fill="${I}"/><circle cx="37.5" cy="31" r="2.2" fill="${I}"/>
      <circle cx="27.2" cy="30.3" r="0.7" fill="#fff"/><circle cx="38.2" cy="30.3" r="0.7" fill="#fff"/>
      <ellipse cx="32" cy="57" rx="2.4" ry="1.7" fill="#d98f8f" ${line(1)}/>
      <path d="M30 52 L21 50 M30 54 L22 56 M34 52 L43 50 M34 54 L42 56" ${line(0.7)}/>`,
    // ---------- hedgerow ----------
    hawk: `
      <g ${line()}>
        <path d="M32 8 C46 8 55 19 54 33 C53 46 44 56 32 56 C20 56 11 46 10 33 C9 19 18 8 32 8 Z" fill="#7d8993"/>
        <path d="M32 24 C41 24 47 31 47 40 C47 49 40 55 32 55 C24 55 17 49 17 40 C17 31 23 24 32 24 Z" fill="#f1ddc4"/>
      </g>
      <path d="M18 27 C21 31 23 33 26 34 M46 27 C43 31 41 33 38 34" stroke="#d68a52" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.8"/>
      <path d="M23 42 h5 M36 42 h5 M21 47 h5 M30 46 h4 M38 47 h5 M25 51 h4 M35 51 h4" stroke="#c4713e" stroke-width="1.5" stroke-linecap="round" opacity="0.85"/>
      <path d="M17 22 C21 17 27 17 30 21 M47 22 C43 17 37 17 34 21" ${line(1.4)} fill="none"/>
      <circle cx="24" cy="26" r="4" fill="#f2c94a" ${line(1)}/><circle cx="40" cy="26" r="4" fill="#f2c94a" ${line(1)}/>
      <circle cx="24" cy="26" r="2" fill="${I}"/><circle cx="40" cy="26" r="2" fill="${I}"/>
      <path d="M32 28 C35 28 36.5 31 34.5 35 L32 38.5 L29.5 35 C27.5 31 29 28 32 28 Z" fill="#3c4046" ${line(1.1)}/>`,
    sparrow: `
      <g ${line()}>
        <path d="M14 38 L3 45 L5 36 Z" fill="#7d5a3c"/>
        <path d="M12 36 C14 25 26 20 38 22 C48 23 52 30 50 38 C48 47 38 52 27 51 C17 50 11 45 12 36 Z" fill="#a67b52"/>
        <path d="M37 14 C46 14 52 20 51 27 C50 33 45 36 38 35 C31 34 28 28 29 22 C30 17 33 14 37 14 Z" fill="#8f9396"/>
        <path d="M50 22 L57 24.5 L50 27 Z" fill="#4a4a4a"/>
      </g>
      <path d="M30 23 C34 21 40 22 44 25 C42 20 36 18 31 19 Z" fill="#8a5a36"/>
      <path d="M39 27 C43 30 47 30 50 28 C49 33 45 35.5 41 35 C38 33 38 30 39 27 Z" fill="#f1e8d8"/>
      <path d="M44 33 C47 35 48 39 46 42 C42 43 38 41 37 37 C39 35 42 34 44 33 Z" fill="${I}"/>
      <path d="M18 36 l5 -3 M22 40 l5 -3 M26 44 l5 -3" stroke="#5e4028" stroke-width="1.6" stroke-linecap="round"/>
      <circle cx="45" cy="23" r="1.6" fill="${I}"/>`,
    robin: `
      <g ${line()}>
        <path d="M14 38 L4 44 L6 35 Z" fill="#8a7a5a"/>
        <path d="M11 37 C11 24 22 15 35 15 C47 15 54 24 53 35 C52 47 42 54 30 54 C18 54 11 47 11 37 Z" fill="#9c8a62"/>
        <path d="M52.5 26 L59 28 L52.5 30 Z" fill="#4a4a4a"/>
      </g>
      <path d="M53 29 C55 40 49 50 38 52 C34 46 33 38 36 30 C40 24 48 23 53 29 Z" fill="#e3734a"/>
      <path d="M25 52 C30 49 34 50 37 52 C33 54 28 54 25 52 Z" fill="#f4ede0"/>
      <circle cx="46" cy="26.5" r="1.9" fill="${I}"/>
      <path d="M17 33 q6 -4 12 -2" stroke="#6e5f42" stroke-width="1.4" fill="none" stroke-linecap="round"/>`,
    bluetit: `
      <g ${line()}>
        <path d="M32 9 C46 9 54 20 54 33 C54 46 44 56 32 56 C20 56 10 46 10 33 C10 20 18 9 32 9 Z" fill="${P}"/>
        <path d="M14 23 C17 13 25 9 32 9 C39 9 47 13 50 23 C44 19 38 18 32 18 C26 18 20 19 14 23 Z" fill="#5f97cc"/>
        <path d="M16 41 C22 39 27 40 32 42 C37 40 42 39 48 41 C46 50 40 56 32 56 C24 56 18 50 16 41 Z" fill="#f2d35c"/>
      </g>
      <path d="M14 29 C20 29 26 28 32 30 C38 28 44 29 50 29" stroke="#1f2a3a" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <path d="M13 36 C20 40 26 41 32 40 C38 41 44 40 51 36" stroke="#1f3a5a" stroke-width="1.6" fill="none" stroke-linecap="round" opacity="0.8"/>
      <circle cx="24" cy="29" r="1.8" fill="${I}"/><circle cx="40" cy="29" r="1.8" fill="${I}"/>
      <path d="M30 32 L34 32 L32 35.5 Z" fill="${I}"/>
      <path d="M29 43 L35 43 L33.5 50 L30.5 50 Z" fill="#33404e" opacity="0.6"/>`,
    wren: `
      <g ${line()}>
        <path d="M18 31 C14 24 10.5 18 11.5 12 C13 8.5 17.5 9.5 18.5 13 C19.5 18 22 24 25 28 Z" fill="#8a6a48"/>
        <path d="M14 38 C14 28 22 23 32 23 C43 23 50 29 50 38 C50 47 42 53 32 53 C22 53 14 47 14 38 Z" fill="#a47c56"/>
        <path d="M49 33 L58 35 L49 37 Z" fill="#6a5a48"/>
      </g>
      <path d="M33 29 C38 26 44 27 48 30" stroke="#efe0c6" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <circle cx="43" cy="33" r="1.7" fill="${I}"/>
      <path d="M20 38 l4 -2 M22 43 l4 -2 M26 47 l4 -2 M14 18 l3 1 M15 22 l3 1" stroke="#5e4028" stroke-width="1.3" stroke-linecap="round" opacity="0.8"/>
      <path d="M34 47 C38 48 43 46 46 43 C44 49 39 52 34 52 Z" fill="#d9bf98" opacity="0.8"/>`,
    // ---------- habitats ----------
    coral: `
      <g ${line()}>
        <path d="M16 58 C16 47 11 41 8 32 C7 28 12 27 13 31 C15 36 18 39 20 41 C20 31 17 23 18 15 C18 11 24 11 24 15 C24 25 25 33 27 41 C29 35 32 29 36 25 C39 22 43 25 40 29 C36 34 33 43 32 51 L32 58 Z" fill="#ec9a9a"/>
        <path d="M35 58 C37 52 43 50 45 44 C46 40 51 40 51 44 C51 50 47 54 47 58 Z" fill="#f2b47a"/>
        <path d="M45 45 C47 38 51 34 55 32 C58 31 59 35 56 37 C53 39 51 42 50 46 Z" fill="#f2b47a"/>
      </g>
      <g fill="${P}" opacity="0.8"><circle cx="21" cy="19" r="1.2"/><circle cx="12" cy="33" r="1.1"/><circle cx="37" cy="28" r="1.1"/><circle cx="48" cy="46" r="1"/></g>`,
    logs: `
      <g ${line()}>
        <circle cx="20" cy="45" r="12" fill="#b07c4c"/><circle cx="44" cy="45" r="12" fill="#a87447"/><circle cx="32" cy="24" r="12" fill="#b88552"/>
      </g>
      <g fill="#e3b885"><circle cx="20" cy="45" r="8"/><circle cx="44" cy="45" r="8"/><circle cx="32" cy="24" r="8"/></g>
      <g fill="none" ${line(0.8)} opacity="0.7"><circle cx="20" cy="45" r="5"/><circle cx="44" cy="45" r="5"/><circle cx="32" cy="24" r="5"/><circle cx="20" cy="45" r="2"/><circle cx="44" cy="45" r="2"/><circle cx="32" cy="24" r="2"/></g>
      <path d="M10 56 Q20 52 30 56 M36 56 Q46 52 56 56" stroke="#7f9a6c" stroke-width="2.4" fill="none" stroke-linecap="round" opacity="0.8"/>`,
    water: `
      <path d="M10 44 q6 -4 12 0 t12 0 t12 0" ${line(1)} fill="none" opacity="0.6"/>
      <path d="M16 30 q6 -4 12 0 t12 0" ${line(1)} fill="none" opacity="0.6"/>`,
    floe: `
      <path d="M5 40 L12 30 L28 26 L44 27 L58 32 L60 41 L48 47 L22 48 Z" fill="#dce9f0" ${line(1.4)}/>
      <path d="M5 40 L22 48 L48 47 L60 41 L60 46 L48 53 L22 54 L5 46 Z" fill="#9cc0d3" ${line(1.4)}/>
      <path d="M18 34 L30 31 M36 33 L48 35 M24 41 L34 39" ${line(0.9)} opacity="0.5" fill="none"/>
      <path d="M2 57 q5 -3 10 0 t10 0 M40 58 q5 -3 10 0 t10 0" ${line(1)} fill="none" opacity="0.6"/>`,
    lily: `
      <g ${line()}>
        <path d="M22 50 C10 50 4 44 5 37 C6 30 14 27 22 27 C30 27 38 31 38 38 L23 39 L35 45 C32 48 28 50 22 50 Z" fill="#7fae66"/>
        <path d="M45 54 C37 54 33 50 34 45 C35 40 40 38 46 38 C52 38 58 41 58 46 L47 46 L55 51 C53 53 49 54 45 54 Z" fill="#8ab872"/>
        <path d="M40 30 C36 26 36 19 40 15 C42 20 43 25 42 30 Z M44 30 C48 26 48 19 44 15 C42 20 41 25 42 30 Z" fill="#f1a9bd"/>
        <path d="M36 31 C32 28 30 23 32 19 C36 23 39 27 40 31 Z M48 31 C52 28 54 23 52 19 C48 23 45 27 44 31 Z" fill="#f4bccb"/>
      </g>
      <circle cx="42" cy="28" r="2.2" fill="#f2d35c"/>
      <path d="M11 38 q4 3 9 1 M42 46 q3 2 6 1" ${line(0.8)} fill="none" opacity="0.5"/>`,
    fig: `
      <g ${line()}>
        <path d="M28 58 C28 50 25 44 27 36 L37 36 C39 44 36 50 36 58 Z" fill="#a98a66"/>
        <path d="M32 6 C44 6 54 12 56 22 C58 32 50 40 40 40 C36 42 28 42 24 40 C14 40 6 32 8 22 C10 12 20 6 32 6 Z" fill="#7ea862"/>
      </g>
      <path d="M27 40 C24 46 23 52 20 58 M37 40 C40 46 41 52 44 58 M30 42 C29 48 30 53 28 58" ${line(1.1)} fill="none" opacity="0.8"/>
      <path d="M16 22 C20 18 26 17 30 19 M36 15 C41 14 46 16 49 20 M22 31 C27 29 33 30 36 33" ${line(0.9)} fill="none" opacity="0.45"/>
      <g fill="#9b5a8a" ${line(0.8)}><circle cx="20" cy="27" r="2.3"/><circle cx="31" cy="24" r="2.3"/><circle cx="43" cy="28" r="2.3"/><circle cx="38" cy="15" r="2.1"/><circle cx="25" cy="15" r="2"/></g>`,
    billabong: `
      <path d="M8 34 q6 -4 12 0 t12 0 t12 0 t12 0" ${line(1)} fill="none" opacity="0.6"/>
      <path d="M2 30 C2 22 4 16 6 12 M5 30 C6 24 9 20 12 18 M60 30 C60 22 59 17 57 13" stroke="#5f7a4e" stroke-width="1.6" fill="none" stroke-linecap="round"/>`,
    hedge: `
      <g ${line()}>
        <ellipse cx="32" cy="16" rx="13" ry="11" fill="#6f9a58"/><ellipse cx="22" cy="34" rx="13" ry="12" fill="#7ea862"/>
        <ellipse cx="42" cy="36" rx="13" ry="12" fill="#6f9a58"/><ellipse cx="31" cy="52" rx="14" ry="10" fill="#7ea862"/>
      </g>
      <g fill="#c4463a" ${line(0.7)}><circle cx="27" cy="18" r="1.7"/><circle cx="38" cy="30" r="1.7"/><circle cx="20" cy="40" r="1.7"/><circle cx="44" cy="44" r="1.7"/><circle cx="33" cy="54" r="1.6"/></g>
      <path d="M26 12 l3 2 M40 22 l3 2 M14 30 l3 2 M48 38 l-3 2 M24 50 l3 2" ${line(0.8)} opacity="0.45"/>`,
    rock: `
      <path d="M8 50 L13 31 L26 21 L42 23 L55 35 L57 50 Z" fill="#b9ad97" fill-opacity="0.8" ${line(1.4)}/>
      <path d="M13 31 L26 21 L42 23 L34 31 Z" fill="#e9e1cf" fill-opacity="0.75"/>
      <path d="M42 33 L47 44 M46 33 L51 44" ${line(0.9)} opacity="0.6"/>`,
  };

  // Painted backdrop for each scene: 400 x 260, horizon at the bottom edge
  const wc = `<filter id="zk-wc" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3" seed="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="9"/><feGaussianBlur stdDeviation="1.1"/></filter>`;
  const SCENES = {
    savanna: `
      <defs>${wc}<linearGradient id="zk-sv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6d7b0" stop-opacity="0.05"/><stop offset="1" stop-color="#eeb48a" stop-opacity="0.8"/></linearGradient></defs>
      <g filter="url(#zk-wc)">
        <path d="M-20 -20 H420 V214 Q330 232 240 220 Q150 208 60 226 Q20 232 -20 226 Z" fill="url(#zk-sv)"/>
        <circle cx="318" cy="214" r="32" fill="#e6875a" opacity="0.55"/>
        <circle cx="318" cy="214" r="19" fill="#f0a26d" opacity="0.6"/>
        <path d="M-20 232 Q70 206 150 222 Q230 238 310 216 Q360 204 420 214 V270 H-20 Z" fill="#a9a2b8" opacity="0.5"/>
        <path d="M-20 246 Q90 230 190 244 Q290 258 420 238 V280 H-20 Z" fill="#9fb08a" opacity="0.6"/>
        <ellipse cx="70" cy="210" rx="32" ry="8" fill="#7f9a6c" opacity="0.75"/>
        <ellipse cx="372" cy="226" rx="18" ry="5" fill="#7f9a6c" opacity="0.7"/>
      </g>
      <g fill="none" ${line(1.2)} opacity="0.85">
        <path d="M68 238 L70 216 M70 216 L62 209 M70 216 L78 208 M70 216 L70 210"/>
        <path d="M40 210 Q52 202 70 202 Q90 202 100 210 Q84 215 70 214 Q54 215 40 210 Z"/>
        <path d="M371 238 L372 228 M372 228 L367 224 M372 228 L377 223"/>
        <path d="M356 226 Q364 221 372 221 Q382 221 388 226 Q380 229 372 229 Q362 229 356 226 Z"/>
        <g class="zk-drift"><path d="M150 120 q4 -4 8 0 q4 -4 8 0 M174 134 q3 -3 6 0 q3 -3 6 0 M196 116 q3 -3 6 0 q3 -3 6 0"/></g>
      </g>`,
    reef: `
      <defs>${wc}<linearGradient id="zk-rf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe3dc" stop-opacity="0.85"/><stop offset="0.7" stop-color="#7fc0bd" stop-opacity="0.75"/><stop offset="1" stop-color="#6aaeb3" stop-opacity="0.7"/></linearGradient></defs>
      <g filter="url(#zk-wc)">
        <path d="M-20 -20 H420 V236 Q320 252 220 240 Q120 228 20 246 L-20 246 Z" fill="url(#zk-rf)"/>
        <polygon points="40,0 96,0 70,220 6,220" fill="#ffffff" opacity="0.18"/>
        <polygon points="180,0 222,0 214,200 154,200" fill="#ffffff" opacity="0.14"/>
        <polygon points="300,0 356,0 398,220 324,220" fill="#ffffff" opacity="0.18"/>
        <path d="M-20 248 Q40 222 90 238 Q120 214 150 236 Q190 226 230 242 Q280 218 320 238 Q360 226 420 240 V280 H-20 Z" fill="#e9a3a0" opacity="0.55"/>
        <path d="M-20 258 Q60 244 140 254 Q220 264 300 250 Q360 242 420 252 V290 H-20 Z" fill="#e2c48a" opacity="0.6"/>
      </g>
      <path d="M-10 14 Q30 6 70 14 T150 14 T230 14 T310 14 T420 14" fill="none" ${line(1.1)} opacity="0.6"/>
      <g fill="none" ${line(1.1)} opacity="0.8">
        <path d="M24 250 C18 226 30 210 22 186 C16 168 26 150 22 134"/>
        <path d="M36 250 C32 230 42 214 36 196"/>
        <path d="M380 250 C386 224 374 206 382 180 C388 162 378 146 382 130"/>
        <path d="M60 232 C60 220 54 214 52 206 M60 222 C64 214 68 210 72 208 M60 226 C56 220 52 218 48 218"/>
        <path d="M330 236 C330 224 336 216 340 210 M330 228 C326 220 322 216 318 214"/>
      </g>
      <g fill="#7f9a6c" opacity="0.55" filter="url(#zk-wc)"><ellipse cx="22" cy="190" rx="8" ry="30"/><ellipse cx="382" cy="186" rx="8" ry="30"/></g>
      <g fill="${I}" opacity="0.45">
        <path d="M300 92 q8 -6 16 0 q-8 6 -16 0 z M300 92 l-5 -4 v8 z"/>
        <path d="M326 110 q6 -5 12 0 q-6 5 -12 0 z M326 110 l-4 -3 v6 z"/>
        <path d="M110 150 q7 -5 14 0 q-7 5 -14 0 z M124 150 l4 -3 v6 z"/>
      </g>
      <g fill="none" stroke="${I}" stroke-width="0.9" opacity="0.55">
        <g class="zk-bubbles"><circle cx="352" cy="200" r="3"/><circle cx="358" cy="180" r="2"/><circle cx="350" cy="164" r="1.5"/></g>
        <g class="zk-bubbles zk-late"><circle cx="48" cy="170" r="2.5"/><circle cx="54" cy="150" r="1.8"/></g>
      </g>`,
    night: `
      <defs>${wc}<linearGradient id="zk-nt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#36406e" stop-opacity="0.85"/><stop offset="0.65" stop-color="#6c78a8" stop-opacity="0.6"/><stop offset="1" stop-color="#b9b3c4" stop-opacity="0.35"/></linearGradient></defs>
      <g filter="url(#zk-wc)">
        <path d="M-20 -20 H420 V226 Q330 240 240 230 Q150 220 60 236 Q20 242 -20 236 Z" fill="url(#zk-nt)"/>
        <circle cx="316" cy="70" r="26" fill="#f3e7c4" opacity="0.95"/>
        <path d="M-20 238 Q40 214 100 230 Q150 210 210 232 Q270 214 330 230 Q380 216 420 228 V280 H-20 Z" fill="#4f6a5a" opacity="0.7"/>
        <path d="M-20 252 Q90 240 190 250 Q290 260 420 246 V290 H-20 Z" fill="#7f9a6c" opacity="0.45"/>
        <ellipse cx="60" cy="196" rx="44" ry="34" fill="#3f5a4c" opacity="0.65"/>
      </g>
      <circle cx="316" cy="70" r="26" fill="none" ${line(1)} opacity="0.5"/>
      <g fill="#fbf6ea" opacity="0.85"><circle cx="40" cy="40" r="1.2"/><circle cx="96" cy="70" r="1"/><circle cx="150" cy="30" r="1.3"/><circle cx="210" cy="64" r="1"/><circle cx="252" cy="26" r="1.2"/><circle cx="370" cy="120" r="1"/><circle cx="130" cy="110" r="0.9"/></g>
      <g fill="none" ${line(1.1)} opacity="0.8">
        <path d="M60 238 L60 196 M60 206 L46 190 M60 212 L76 194"/>
        <path d="M250 240 V214 M262 240 V212 M274 240 V214 M286 240 V212 M298 240 V214 M244 222 H304 M244 232 H304"/>
        <path d="M250 214 l0 -4 M262 212 l0 -4 M274 214 l0 -4 M286 212 l0 -4 M298 214 l0 -4"/>
      </g>
      <g class="zk-flies" fill="#f2d36b"><circle cx="120" cy="214" r="1.8"/><circle cx="196" cy="196" r="1.6"/><circle cx="340" cy="206" r="1.8"/><circle cx="222" cy="228" r="1.4"/></g>`,
    ice: `
      <defs>${wc}<linearGradient id="zk-ic" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe0ea" stop-opacity="0.85"/><stop offset="0.7" stop-color="#e3d9e6" stop-opacity="0.7"/><stop offset="1" stop-color="#f3e2d6" stop-opacity="0.6"/></linearGradient></defs>
      <g filter="url(#zk-wc)">
        <path d="M-20 -20 H420 V214 Q330 226 240 218 Q150 210 60 222 Q20 228 -20 222 Z" fill="url(#zk-ic)"/>
        <path d="M30 214 L44 176 L92 168 L120 184 L126 214 Z" fill="#f7fbfd" opacity="0.95"/>
        <path d="M92 168 L120 184 L126 214 L106 214 Z" fill="#a8c7d8" opacity="0.7"/>
        <path d="M270 216 L282 190 L340 184 L362 196 L366 216 Z" fill="#f7fbfd" opacity="0.95"/>
        <path d="M340 184 L362 196 L366 216 L350 216 Z" fill="#a8c7d8" opacity="0.7"/>
        <path d="M-20 222 Q90 212 200 224 Q300 234 420 218 V250 H-20 Z" fill="#6b93a8" opacity="0.6"/>
        <path d="M-20 244 Q60 236 120 246 L150 252 Q200 238 250 248 Q330 236 420 244 V290 H-20 Z" fill="#eef4f7" opacity="0.85"/>
      </g>
      <g fill="none" ${line(1.1)} opacity="0.75">
        <path d="M30 214 L44 176 L92 168 L120 184 L126 214"/><path d="M270 216 L282 190 L340 184 L362 196 L366 216"/>
        <path d="M40 232 q8 -3 16 0 M180 236 q8 -3 16 0 M320 230 q8 -3 16 0"/>
        <g class="zk-drift"><path d="M170 112 q5 -4 10 0 q5 -4 10 0 M208 128 q4 -3 8 0 q4 -3 8 0"/></g>
      </g>
      <g class="zk-snow" fill="#ffffff" opacity="0.9"><circle cx="60" cy="40" r="1.6"/><circle cx="140" cy="20" r="1.3"/><circle cx="230" cy="60" r="1.5"/><circle cx="300" cy="30" r="1.2"/><circle cx="360" cy="80" r="1.5"/><circle cx="100" cy="110" r="1.2"/><circle cx="260" cy="130" r="1.4"/></g>`,
    pond: `
      <defs>${wc}<linearGradient id="zk-pd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dfe8cf" stop-opacity="0.75"/><stop offset="1" stop-color="#b9d0b0" stop-opacity="0.75"/></linearGradient></defs>
      <g filter="url(#zk-wc)">
        <path d="M-20 -20 H420 V214 Q330 224 240 216 Q150 208 60 220 Q20 226 -20 220 Z" fill="url(#zk-pd)"/>
        <ellipse cx="340" cy="150" rx="70" ry="64" fill="#8fae78" opacity="0.6"/>
        <path d="M-20 216 Q100 204 200 214 Q300 224 420 210 V250 H-20 Z" fill="#7f9a6c" opacity="0.55"/>
        <path d="M-20 232 Q120 222 220 232 Q320 240 420 228 V290 H-20 Z" fill="#8cbcc0" opacity="0.6"/>
        <ellipse cx="90" cy="240" rx="18" ry="5" fill="#7fae66" opacity="0.85"/><ellipse cx="250" cy="246" rx="14" ry="4" fill="#7fae66" opacity="0.85"/>
      </g>
      <g fill="none" ${line(1.1)} opacity="0.8">
        <path d="M340 230 L338 120 M338 150 C320 160 306 180 300 210 M338 136 C356 150 368 172 372 204 M338 160 C350 176 356 196 356 222 M338 128 C324 140 316 158 314 186"/>
        <path d="M30 236 C30 214 26 196 24 180 M40 236 C42 216 44 200 48 186 M52 236 C52 222 54 210 58 200"/>
        <path d="M376 236 C376 216 380 202 384 192"/>
        <path d="M82 240 q8 -4 16 0 M242 246 q8 -3 14 0"/>
        <g class="zk-drift"><path d="M180 140 L196 140 M186 136 L190 144 M182 144 L194 136"/></g>
      </g>
      <g fill="#7a5a3a" opacity="0.8"><rect x="22" y="170" width="4.5" height="14" rx="2.2"/><rect x="46" y="176" width="4.5" height="13" rx="2.2"/><rect x="382" y="184" width="4" height="12" rx="2"/></g>
      <g fill="#f1a9bd"><circle cx="96" cy="237" r="2.6"/></g>`,
    jungle: `
      <defs>${wc}<linearGradient id="zk-jg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe2c4" stop-opacity="0.75"/><stop offset="1" stop-color="#9fbf8e" stop-opacity="0.75"/></linearGradient></defs>
      <g filter="url(#zk-wc)">
        <path d="M-20 -20 H420 V224 Q330 236 240 228 Q150 220 60 232 Q20 238 -20 232 Z" fill="url(#zk-jg)"/>
        <ellipse cx="40" cy="40" rx="90" ry="60" fill="#5f8a52" opacity="0.6"/><ellipse cx="370" cy="30" rx="90" ry="62" fill="#5f8a52" opacity="0.6"/>
        <ellipse cx="200" cy="-10" rx="120" ry="40" fill="#6f9a58" opacity="0.5"/>
        <path d="M-20 214 Q60 196 120 212 Q180 196 240 214 Q310 194 420 210 V250 H-20 Z" fill="#567f4a" opacity="0.55"/>
        <path d="M-20 238 Q100 228 200 238 Q300 248 420 232 V290 H-20 Z" fill="#7f9a6c" opacity="0.55"/>
        <ellipse cx="200" cy="200" rx="160" ry="16" fill="#ffffff" opacity="0.28"/>
      </g>
      <g fill="none" ${line(1.1)} opacity="0.8">
        <path d="M70 0 C66 40 74 80 68 120 M68 70 q-6 4 -10 2 M70 96 q6 3 10 0"/>
        <path d="M330 0 C334 50 326 100 332 150 M331 60 q6 4 10 2 M330 110 q-6 3 -10 0"/>
        <path d="M110 0 C110 30 116 50 112 70"/>
        <path d="M30 238 C30 216 34 196 30 176 M30 196 C20 186 12 186 4 192 M31 186 C42 176 52 176 60 182"/>
        <path d="M372 238 C372 214 368 196 372 176 M371 196 C382 188 392 188 400 194 M372 186 C362 178 352 178 344 184"/>
      </g>
      <g fill="#7ea862" opacity="0.85" ${line(1)}><path d="M4 192 C10 182 22 182 30 196 C20 200 10 198 4 192 Z"/><path d="M60 182 C54 172 42 172 31 186 C42 190 54 188 60 182 Z"/><path d="M400 194 C394 184 382 184 371 196 C382 200 394 198 400 194 Z"/><path d="M344 184 C350 174 362 174 372 186 C362 190 350 188 344 184 Z"/></g>
      <g class="zk-drift" fill="#e9a23a" opacity="0.85"><path d="M176 120 l6 -5 l1 6 z M183 115 l6 5 l-6 1 z"/><path d="M226 150 l5 -4 l1 5 z M232 146 l5 4 l-5 1 z"/></g>`,
    outback: `
      <defs>${wc}<linearGradient id="zk-ob" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3d6b0" stop-opacity="0.35"/><stop offset="1" stop-color="#eba57a" stop-opacity="0.85"/></linearGradient></defs>
      <g filter="url(#zk-wc)">
        <path d="M-20 -20 H420 V216 Q330 228 240 220 Q150 212 60 226 Q20 232 -20 226 Z" fill="url(#zk-ob)"/>
        <path d="M214 222 L238 198 L340 194 L368 222 Z" fill="#b4573a" opacity="0.75"/>
        <path d="M-20 228 Q80 214 180 226 Q280 238 420 220 V250 H-20 Z" fill="#c8693f" opacity="0.6"/>
        <path d="M-20 246 Q100 236 200 246 Q300 256 420 240 V290 H-20 Z" fill="#d98c58" opacity="0.6"/>
        <ellipse cx="80" cy="222" rx="16" ry="6" fill="#a9a35f" opacity="0.8"/><ellipse cx="360" cy="234" rx="14" ry="5" fill="#a9a35f" opacity="0.8"/>
        <ellipse cx="66" cy="168" rx="36" ry="20" fill="#9fae7e" opacity="0.7"/>
      </g>
      <g fill="none" ${line(1.1)} opacity="0.8">
        <path d="M214 222 L238 198 L340 194 L368 222 M266 197 L268 208 M306 195 L308 206"/>
        <path d="M64 240 C66 220 62 200 66 180 M66 196 C56 186 46 182 36 176 M66 188 C76 178 88 174 98 170"/>
        <path d="M70 222 q5 -8 10 0 q5 -8 10 0 M350 234 q5 -7 10 0 q5 -7 10 0"/>
        <g class="zk-drift"><path d="M140 110 q5 -4 10 0 q5 -4 10 0 M166 124 q4 -3 8 0 q4 -3 8 0"/></g>
      </g>
      <path d="M64 240 C66 220 62 200 66 180" stroke="#f4ece0" stroke-width="2.2" fill="none" opacity="0.8"/>`,
    meadow: `
      <defs>${wc}<linearGradient id="zk-md" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9dde6" stop-opacity="0.8"/><stop offset="1" stop-color="#e9ead2" stop-opacity="0.7"/></linearGradient></defs>
      <g filter="url(#zk-wc)">
        <path d="M-20 -20 H420 V216 Q330 228 240 220 Q150 212 60 226 Q20 232 -20 226 Z" fill="url(#zk-md)"/>
        <g class="zk-drift" fill="#ffffff" opacity="0.85"><ellipse cx="90" cy="60" rx="34" ry="11"/><ellipse cx="110" cy="52" rx="20" ry="10"/><ellipse cx="300" cy="90" rx="30" ry="9"/></g>
        <path d="M-20 214 Q60 190 140 206 Q220 186 300 204 Q360 192 420 202 V250 H-20 Z" fill="#a9c08a" opacity="0.65"/>
        <path d="M-20 230 Q20 214 60 222 Q100 212 140 224 Q180 212 220 226 Q260 214 300 226 Q340 214 380 226 Q400 220 420 222 V250 H-20 Z" fill="#6f9a58" opacity="0.7"/>
        <path d="M-20 246 Q100 236 200 246 Q300 256 420 240 V290 H-20 Z" fill="#9fb87e" opacity="0.6"/>
      </g>
      <g fill="none" ${line(1.1)} opacity="0.7">
        <path d="M-20 230 Q20 214 60 222 Q100 212 140 224 Q180 212 220 226 Q260 214 300 226 Q340 214 380 226 Q400 220 420 222"/>
        <path d="M190 140 q4 -4 8 0 q4 -4 8 0"/>
      </g>
      <g fill="#c4463a"><circle cx="70" cy="224" r="1.8"/><circle cx="160" cy="222" r="1.8"/><circle cx="250" cy="226" r="1.8"/><circle cx="340" cy="222" r="1.8"/></g>
      <g fill="#f4ede0" ${line(0.8)}><circle cx="40" cy="244" r="2.4"/><circle cx="120" cy="248" r="2.2"/><circle cx="300" cy="244" r="2.4"/><circle cx="370" cy="248" r="2.2"/></g>
      <g fill="#f2d35c"><circle cx="40" cy="244" r="0.9"/><circle cx="120" cy="248" r="0.8"/><circle cx="300" cy="244" r="0.9"/><circle cx="370" cy="248" r="0.8"/></g>`,
  };

  window.ZART = { ART, SCENES };
})();
