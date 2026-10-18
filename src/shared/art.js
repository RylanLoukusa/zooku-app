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
    // ---------- desert ----------
    roadrunner: `
      <g ${line()}>
        <path d="M22 39 L4 22 L8 18 L27 34 Z" fill="#6f6250"/>
        <path d="M18 41 C18 32 27 28 36 29 C44 30 48 36 46 43 C44 50 35 53 27 52 C21 51 18 47 18 41 Z" fill="#a89276"/>
        <path d="M37 31 C37 23 41 17 47 17 C53 17 56 21 54 26 C52 31 46 34 42 35 Z" fill="#b29c80"/>
        <path d="M42 15 L45 7 L48 14 L52 9 L51 16 Z" fill="#4c4238"/>
        <path d="M53 22 L63 24.5 L53 26 Z" fill="#4c4238"/>
        <path d="M30 52 L27 60 L23 61 M27 60 L30 62 M37 52 L38 60 L35 62 M38 60 L42 61" fill="none"/>
      </g>
      <path d="M24 39 l5 2 M28 44 l5 2 M33 36 l5 2 M36 44 l5 2 M41 39 l4 2" stroke="#4c4238" stroke-width="1.4" stroke-linecap="round"/>
      <path d="M47 19.5 C50 18 53 20 53 22 C51 23 49 23 47 22 Z" fill="#7fb0d4"/>
      <path d="M45 23 C43 23.5 41.5 24.5 40.5 26" stroke="#d35e45" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <circle cx="49.5" cy="20.5" r="1.5" fill="${I}"/>`,
    whiptail: `
      <g ${line()}>
        <path d="M2 47 C12 48 20 46 27 41 L28 45 C20 49 11 50 2 47 Z" fill="#7d6d4f"/>
        <path d="M31 45 L27 52 M41 46 L43 53 M35 35 L31 29 M47 35 L50 29" fill="none" stroke-width="1.8"/>
        <path d="M24 42 C24 36 32 33 42 34 C50 35 56 37 59 40 C60 42 57 44 52 44 C44 46 34 47 28 46 C25 45 24 44 24 42 Z" fill="#8f7c55"/>
      </g>
      <path d="M28 39.5 C36 37.5 46 37.5 56 39.5 M27 43 C35 42 45 42 53 42.5" stroke="#f1e6bd" stroke-width="1.3" fill="none" stroke-linecap="round"/>
      <path d="M8 47.5 C14 47.8 20 46.5 25 43.5" stroke="#5f523b" stroke-width="1" fill="none" opacity=".6"/>
      <circle cx="54" cy="38.6" r="1.4" fill="${I}"/>`,
    hornedlizard: `
      <g ${line()}>
        <path d="M29 47 L32 62 L35 47 Z" fill="#c2a578"/>
        <path d="M18 31 L9 25 M46 31 L55 25 M18 45 L9 51 M46 45 L55 51" fill="none" stroke-width="2.2"/>
        <ellipse cx="32" cy="38" rx="16" ry="13" fill="#cdb07f"/>
        <path d="M23 26 C23 18 41 18 41 26 C41 30 37 32 32 32 C27 32 23 30 23 26 Z" fill="#cdb07f"/>
        <path d="M23.5 22 L18 14.5 L26 19.5 Z M28 19 L26 10 L31 17 Z M36 19 L38 10 L33 17 Z M40.5 22 L46 14.5 L38 19.5 Z" fill="#efe4c7"/>
      </g>
      <g fill="#7a5e3e" opacity=".6"><ellipse cx="25" cy="36" rx="3" ry="2"/><ellipse cx="39" cy="36" rx="3" ry="2"/><ellipse cx="32" cy="42" rx="3" ry="2"/><ellipse cx="25" cy="44" rx="2.4" ry="1.6"/><ellipse cx="39" cy="44" rx="2.4" ry="1.6"/></g>
      <g fill="#efe4c7" stroke="${I}" stroke-width=".7"><path d="M16 36 l-3 1.2 l3 1.2 Z M16 41 l-3 1.2 l3 1.2 Z M48 36 l3 1.2 l-3 1.2 Z M48 41 l3 1.2 l-3 1.2 Z"/></g>
      <circle cx="28" cy="25.5" r="1.5" fill="${I}"/><circle cx="36" cy="25.5" r="1.5" fill="${I}"/>`,
    chuckwalla: `
      <g ${line()}>
        <path d="M3 41 C10 45 18 46 25 44 L25 48 C17 50 9 48 3 41 Z" fill="#e3aa52"/>
        <path d="M30 47 L26 54 M41 48 L43 55 M34 34 L30 28 M48 35 L51 29" fill="none" stroke-width="2"/>
        <path d="M20 44 C20 35 30 31 42 32 C51 33 57 36 59 40 C59 44 55 46 49 47 C39 49 29 50 20 44 Z" fill="#c9774a"/>
        <path d="M41 32.3 C51 33 57 36 59 40 C59 44 55 46 49 47 C45 47.8 42 48 39 48 C41 43 41 37 41 32.3 Z" fill="#46413b"/>
      </g>
      <path d="M45 35 q2 3 0 6 M48.5 35 q2 3 0 6" stroke="#8e857a" stroke-width="1" fill="none"/>
      <g fill="#e9b07a" opacity=".7"><circle cx="27" cy="39" r="1.2"/><circle cx="33" cy="37" r="1.1"/><circle cx="31" cy="43" r="1.2"/></g>
      <circle cx="54.5" cy="38.5" r="1.5" fill="#f2d36b"/><circle cx="54.6" cy="38.5" r=".8" fill="${I}"/>`,
    collared: `
      <g ${line()}>
        <path d="M2 45 C11 47 19 45 25 41 L26 45 C19 49 10 49 2 45 Z" fill="#5d9c8f"/>
        <path d="M30 45 L25 52 M40 46 L42 53 M33 34 L29 28 M44 35 L47 29" fill="none" stroke-width="1.8"/>
        <path d="M23 42 C23 36 31 33 40 34 C48 35 55 36 59 39 C61 41 58 44 53 44 C44 46 34 47 28 46 C24 45 23 44 23 42 Z" fill="#5fa79a"/>
        <path d="M46 35 C51 35.3 56 36.5 59 39 C61 41 58 44 53 44 C51 44.4 49 44.6 47 44.8 C48 41 48 38 46 35 Z" fill="#e8c25a"/>
      </g>
      <path d="M44 34.8 C45 38 45 42 44 45 M41 34.4 C42 38 42 42 41 45.4" stroke="${I}" stroke-width="2" fill="none"/>
      <g fill="#e9f2df" opacity=".85"><circle cx="28" cy="39" r="1.1"/><circle cx="33" cy="37" r="1"/><circle cx="34" cy="42" r="1.1"/><circle cx="29" cy="43.5" r="1"/><circle cx="38" cy="39.5" r="1"/></g>
      <circle cx="54.5" cy="38.4" r="1.5" fill="${I}"/>`,
    // ---------- arctic tundra ----------
    arcticfox: `
      <g ${line()}>
        <path d="M18 23 C14 15 18 9 25 13 Z" fill="#eceae3"/><path d="M46 23 C50 15 46 9 39 13 Z" fill="#eceae3"/>
        <path d="M32 14 C46 14 54 24 53 34 C52 42 44 46 40 53 L24 53 C20 46 12 42 11 34 C10 24 18 14 32 14 Z" fill="#f7f5ef"/>
      </g>
      <path d="M19 20 C18 16 20 14 23 15.5 M45 20 C46 16 44 14 41 15.5" stroke="#bdb6aa" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M12 36 C15 40 19 42 22 43 M52 36 C49 40 45 42 42 43" stroke="#cfc9bd" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      <circle cx="25" cy="30" r="2.6" fill="#d9a441" ${line(1)}/><circle cx="39" cy="30" r="2.6" fill="#d9a441" ${line(1)}/>
      <circle cx="25" cy="30" r="1.1" fill="${I}"/><circle cx="39" cy="30" r="1.1" fill="${I}"/>
      <ellipse cx="32" cy="51" rx="3.2" ry="2.2" fill="${I}"/>`,
    lemming: `
      <path d="M32 15 C47 15 55 26 54 38 C53 49 44 56 32 56 C20 56 11 49 10 38 C9 26 17 15 32 15 Z" fill="#e8e4dc" ${line()}/>
      <path d="M13 44 C19 49 25 51 32 51 C39 51 45 49 51 44 C50 47 48 50 45 52 C40 54.5 36 55.5 32 55.5 C28 55.5 24 54.5 19 52 C16 50 14 47 13 44 Z" fill="#d79a62" opacity=".85"/>
      <g ${line(1.2)}><circle cx="20" cy="21" r="3.5" fill="#d8d2c6"/><circle cx="44" cy="21" r="3.5" fill="#d8d2c6"/></g>
      <path d="M32 18 L32 30" stroke="#8e8a83" stroke-width="2.2" stroke-linecap="round" opacity=".6"/>
      <circle cx="25" cy="33" r="2.2" fill="${I}"/><circle cx="39" cy="33" r="2.2" fill="${I}"/>
      <circle cx="25.7" cy="32.3" r=".7" fill="#fff"/><circle cx="39.7" cy="32.3" r=".7" fill="#fff"/>
      <circle cx="32" cy="41" r="1.8" fill="#c98a8a" ${line(1)}/>
      <path d="M28 43 L19 41 M28 45 L20 47 M36 43 L45 41 M36 45 L44 47" ${line(.7)}/>`,
    arctichare: `
      <g ${line()}>
        <path d="M24 27 C19 17 18 7 21 3 C26 6 29 16 29 24 Z" fill="#f4f2ec"/><path d="M40 27 C45 17 46 7 43 3 C38 6 35 16 35 24 Z" fill="#f4f2ec"/>
        <path d="M32 21 C44 21 50 29 49 38 C48 47 41 54 32 54 C23 54 16 47 15 38 C14 29 20 21 32 21 Z" fill="#f7f6f1"/>
      </g>
      <path d="M21 3.5 C20.5 6 21 8 22 9.5 L24 5.5 Z M43 3.5 C43.5 6 43 8 42 9.5 L40 5.5 Z" fill="${I}"/>
      <path d="M22.5 12 C23.5 17 25 21 26.5 24 M41.5 12 C40.5 17 39 21 37.5 24" stroke="#e7c9c0" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="25.5" cy="35" r="2.3" fill="#a8763e" ${line(1)}/><circle cx="38.5" cy="35" r="2.3" fill="#a8763e" ${line(1)}/>
      <circle cx="25.5" cy="35" r="1" fill="${I}"/><circle cx="38.5" cy="35" r="1" fill="${I}"/>
      <path d="M30 44 L34 44 L32 46.5 Z" fill="#c98a8a"/><path d="M32 46.5 L32 49 M32 49 Q29.5 51 28 49.5 M32 49 Q34.5 51 36 49.5" ${line(1)} fill="none"/>`,
    groundsquirrel: `
      <g ${line()}><circle cx="19" cy="21" r="4" fill="#b9915f"/><circle cx="45" cy="21" r="4" fill="#b9915f"/></g>
      <path d="M32 16 C46 16 53 26 52 37 C51 48 43 55 32 55 C21 55 13 48 12 37 C11 26 18 16 32 16 Z" fill="#c9a26e" ${line()}/>
      <path d="M14 40 C14 46 20 52 26 53 C24 48 23 44 23 40 Z M50 40 C50 46 44 52 38 53 C40 48 41 44 41 40 Z" fill="#dcbb8b" opacity=".9"/>
      <ellipse cx="32" cy="45" rx="7" ry="6" fill="#ead2ab"/>
      <g fill="#f4ead6" opacity=".9"><circle cx="20" cy="27" r="1.1"/><circle cx="44" cy="27" r="1.1"/><circle cx="26" cy="22" r="1"/><circle cx="38" cy="22" r="1"/><circle cx="32" cy="20" r="1"/></g>
      <path d="M21 31 C23 30 26 30 28 31.5 M43 31 C41 30 38 30 36 31.5" stroke="#f4ead6" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <circle cx="25" cy="34" r="2.2" fill="${I}"/><circle cx="39" cy="34" r="2.2" fill="${I}"/>
      <circle cx="32" cy="43" r="1.8" fill="#6b4a3a"/>`,
    tundravole: `
      <g ${line()}><circle cx="20" cy="24" r="4.5" fill="#6f5b47"/><circle cx="44" cy="24" r="4.5" fill="#6f5b47"/></g>
      <path d="M32 19 C46 19 53 29 51 40 C49 50 41 55 32 55 C23 55 15 50 13 40 C11 29 18 19 32 19 Z" fill="#7d6650" ${line()}/>
      <ellipse cx="32" cy="46" rx="8" ry="6" fill="#a68f75"/>
      <circle cx="25.5" cy="35" r="1.9" fill="${I}"/><circle cx="38.5" cy="35" r="1.9" fill="${I}"/>
      <circle cx="32" cy="44" r="1.8" fill="${I}"/>
      <path d="M28 46 L18 44 M28 48 L19 50 M36 46 L46 44 M36 48 L45 50" ${line(.7)}/>
      <path d="M22 50 q3 3 6 2 M36 52 q3 1 6 -2" stroke="#d4c3a2" stroke-width="2.2" fill="none" stroke-linecap="round"/>`,
    // ---------- kelp forest ----------
    otter: `
      <g ${line()}>
        <circle cx="17" cy="20" r="4.5" fill="#6d5340"/><circle cx="47" cy="20" r="4.5" fill="#6d5340"/>
        <path d="M32 11 C45 11 52 20 51 31 C50 41 42 47 32 47 C22 47 14 41 13 31 C12 20 19 11 32 11 Z" fill="#7a5c45"/>
        <path d="M32 19 C41 19 46 25 45 32 C44 39 39 43 32 43 C25 43 20 39 19 32 C18 25 23 19 32 19 Z" fill="#e7dccb"/>
        <path d="M12 64 C12 54 20 49 32 49 C44 49 52 54 52 64 Z" fill="#7a5c45"/>
        <ellipse cx="32" cy="55" rx="7" ry="4.6" fill="#b9c3c8"/>
        <path d="M22 55 C23 51 27 51 28 54 M42 55 C41 51 37 51 36 54" fill="#7a5c45"/>
      </g>
      <circle cx="26" cy="29" r="2" fill="${I}"/><circle cx="38" cy="29" r="2" fill="${I}"/>
      <path d="M29 34 C30 32.5 34 32.5 35 34 C34 36 30 36 29 34 Z" fill="${I}"/>
      <path d="M28 37 L19 35 M28 39 L20 41 M36 37 L45 35 M36 39 L44 41" ${line(.7)}/>
      <path d="M29 54 q3 -2 6 0" stroke="#8a969c" stroke-width="1" fill="none"/>`,
    urchin: `
      <g stroke="${I}" stroke-width="1.4" stroke-linecap="round">
        <path d="M32 8 V18 M32 46 V56 M8 32 H18 M46 32 H56 M15 15 L22 22 M49 15 L42 22 M15 49 L22 42 M49 49 L42 42 M22 10 L26 19 M42 10 L38 19 M10 22 L19 26 M54 22 L45 26 M10 42 L19 38 M54 42 L45 38 M22 54 L26 45 M42 54 L38 45"/>
      </g>
      <circle cx="32" cy="32" r="14" fill="#7d4f8f" ${line()}/>
      <g stroke="#b78bc6" stroke-width="1.2" fill="none" opacity=".8"><path d="M32 19 V45 M21 25 C26 30 26 34 21 39 M43 25 C38 30 38 34 43 39"/></g>
      <g fill="#c9a6d4"><circle cx="27" cy="27" r="1"/><circle cx="37" cy="27" r="1"/><circle cx="27" cy="37" r="1"/><circle cx="37" cy="37" r="1"/><circle cx="32" cy="32" r="1.2"/></g>`,
    crab: `
      <g ${line()}>
        <path d="M14 38 L5 44 M14 42 L7 50 M16 45 L11 54 M50 38 L59 44 M50 42 L57 50 M48 45 L53 54" fill="none" stroke-width="2"/>
        <path d="M20 30 C16 24 12 22 9 18 M44 30 C48 24 52 22 55 18" fill="none" stroke-width="2.4"/>
        <path d="M4 14 C4 8 12 7 14 12 L11 16 L15 19 C12 23 4 21 4 14 Z" fill="#c4553f"/>
        <path d="M60 14 C60 8 52 7 50 12 L53 16 L49 19 C52 23 60 21 60 14 Z" fill="#c4553f"/>
        <path d="M32 27 C46 27 52 33 51 40 C50 47 42 50 32 50 C22 50 14 47 13 40 C12 33 18 27 32 27 Z" fill="#cf6a4f"/>
      </g>
      <path d="M4.5 12 C5 9.5 7 8.5 9.5 9 M59.5 12 C59 9.5 57 8.5 54.5 9" stroke="${I}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <path d="M26 27 L25 22 M38 27 L39 22" ${line(1.4)}/><circle cx="25" cy="21" r="2" fill="${I}"/><circle cx="39" cy="21" r="2" fill="${I}"/>
      <path d="M22 37 q10 4 20 0" stroke="#e9a184" stroke-width="1.4" fill="none"/>`,
    abalone: `
      <path d="M12 38 C10 24 22 12 38 13 C52 14 58 26 55 38 C52 50 38 56 26 53 C17 51 13 46 12 38 Z" fill="#b25e48" ${line()}/>
      <path d="M17 41 C16 30 25 20 37 20 C48 21 52 30 50 38 C48 46 38 50 29 48 C22 47 18 45 17 41 Z" fill="#c97a5b" opacity=".85"/>
      <path d="M15 44 C24 52 40 53 50 45" stroke="#bfe1dc" stroke-width="3" fill="none" stroke-linecap="round" opacity=".9"/>
      <path d="M15 44 C24 52 40 53 50 45" stroke="#e6c7e3" stroke-width="1.2" fill="none" stroke-linecap="round"/>
      <g fill="#5a3328" ${line(.8)}><circle cx="20" cy="30" r="1.8"/><circle cx="25" cy="24" r="1.8"/><circle cx="31" cy="20" r="1.8"/><circle cx="38" cy="18.5" r="1.8"/><circle cx="45" cy="19.5" r="1.6"/></g>
      <path d="M22 38 C28 30 38 27 46 31 M24 43 C31 37 41 35 48 37" stroke="#8e4a38" stroke-width="1" fill="none" opacity=".7"/>`,
    mussel: `
      <path d="M14 50 C10 44 12 34 20 24 C28 14 40 9 48 12 C55 15 54 24 48 32 C40 43 26 54 14 50 Z" fill="#3e4a63" ${line()}/>
      <path d="M17 46 C15 40 18 32 25 25 C32 18 41 14 47 16" stroke="#6f7fa3" stroke-width="2" fill="none" opacity=".8"/>
      <path d="M22 44 C28 40 36 34 42 26 M28 46 C34 41 41 35 46 28" stroke="#5b6888" stroke-width="1.2" fill="none" opacity=".8"/>
      <path d="M15 50 C14 54 11 57 8 58 M16 50 C17 55 16 58 14 61 M17 49 C20 53 21 57 20 60" stroke="#b39a62" stroke-width="1.1" fill="none" stroke-linecap="round"/>`,
    // ---------- himalaya ----------
    snowleopard: `
      <g ${line()}>
        <circle cx="18" cy="20" r="5.5" fill="#d9d6cc"/><circle cx="46" cy="20" r="5.5" fill="#d9d6cc"/>
        <path d="M32 13 C47 13 55 24 54 36 C53 47 44 54 32 54 C20 54 11 47 10 36 C9 24 17 13 32 13 Z" fill="#e6e2d6"/>
        <ellipse cx="32" cy="45" rx="9" ry="7" fill="#f6f3ea"/>
      </g>
      <g fill="none" stroke="#5f5a52" stroke-width="1.3" opacity=".85"><circle cx="20" cy="31" r="2.6"/><circle cx="44" cy="31" r="2.6"/><circle cx="18" cy="40" r="2.2"/><circle cx="46" cy="40" r="2.2"/><circle cx="27" cy="19" r="2"/><circle cx="37" cy="19" r="2"/><circle cx="32" cy="25" r="1.6"/></g>
      <ellipse cx="26" cy="33" rx="3" ry="2.4" fill="#9fb0a0" ${line(1)}/><ellipse cx="38" cy="33" rx="3" ry="2.4" fill="#9fb0a0" ${line(1)}/>
      <ellipse cx="26" cy="33" rx="1" ry="2" fill="${I}"/><ellipse cx="38" cy="33" rx="1" ry="2" fill="${I}"/>
      <path d="M29.5 41 L34.5 41 L32 44 Z" fill="#c98a8a" ${line(.8)}/>
      <path d="M32 44 V47 M32 47 Q29 49.5 27 47.5 M32 47 Q35 49.5 37 47.5" ${line(1)} fill="none"/>`,
    bharal: `
      <path d="M22 18 C14 16 6 18 4 26 C8 22 14 21 20 23 Z M42 18 C50 16 58 18 60 26 C56 22 50 21 44 23 Z" fill="#a6987e" ${line(1.4)}/>
      <g ${line()}>
        <path d="M18 26 L10 24 L19 31 Z M46 26 L54 24 L45 31 Z" fill="#8f9aa6"/>
        <path d="M21 20 C21 13 43 13 43 20 L41 46 C41 56 23 56 23 46 Z" fill="#98a3ae"/>
        <ellipse cx="32" cy="49" rx="7.5" ry="6" fill="#c3c9cf"/>
      </g>
      <path d="M23 34 C26 38 27 42 27 46 M41 34 C38 38 37 42 37 46" stroke="#33373d" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      <circle cx="26.5" cy="29" r="2" fill="${I}"/><circle cx="37.5" cy="29" r="2" fill="${I}"/>
      <ellipse cx="32" cy="51" rx="2.4" ry="1.6" fill="${I}"/>`,
    tahr: `
      <path d="M24 17 C22 11 25 6 30 6 C27 9 26 13 27 17 Z M40 17 C42 11 39 6 34 6 C37 9 38 13 37 17 Z" fill="#7a6c5a" ${line(1.3)}/>
      <g ${line()}>
        <path d="M18 24 L10 21 L19 29 Z M46 24 L54 21 L45 29 Z" fill="#9a6a44"/>
        <path d="M10 64 C8 50 14 40 22 38 L42 38 C50 40 56 50 54 64 Z" fill="#a8744a"/>
        <path d="M22 18 C22 12 42 12 42 18 L40 44 C40 53 24 53 24 44 Z" fill="#8a5d3c"/>
        <ellipse cx="32" cy="47" rx="7" ry="5.5" fill="#6e4a32"/>
      </g>
      <path d="M14 46 q3 5 2 10 M20 44 q2 6 0 12 M50 46 q-3 5 -2 10 M44 44 q-2 6 0 12" stroke="#d3a876" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      <circle cx="27" cy="27" r="1.9" fill="${I}"/><circle cx="37" cy="27" r="1.9" fill="${I}"/>
      <ellipse cx="32" cy="49" rx="2.4" ry="1.6" fill="${I}"/>`,
    markhor: `
      <g fill="#c9b48e" ${line(1.3)}>
        <path d="M26 17 L22 13 L26 11 L21 7 L25 5 L20 1 L24 2 L29 8 L26 9 L30 12 L27 13 Z"/>
        <path d="M38 17 L42 13 L38 11 L43 7 L39 5 L44 1 L40 2 L35 8 L38 9 L34 12 L37 13 Z"/>
      </g>
      <g ${line()}>
        <path d="M19 23 L11 21 L20 29 Z M45 23 L53 21 L44 29 Z" fill="#b8a283"/>
        <path d="M22 17 C22 11 42 11 42 17 L40 42 C40 50 24 50 24 42 Z" fill="#c6b08f"/>
        <path d="M25 46 C24 55 28 62 32 63 C36 62 40 55 39 46 C36 49 28 49 25 46 Z" fill="#5c5046"/>
      </g>
      <path d="M26.5 30 C27.5 35 28.5 39 29 43 M37.5 30 C36.5 35 35.5 39 35 43" stroke="#7b6a55" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".7"/>
      <circle cx="27" cy="26" r="1.8" fill="${I}"/><circle cx="37" cy="26" r="1.8" fill="${I}"/>
      <ellipse cx="32" cy="43" rx="2.4" ry="1.6" fill="${I}"/>`,
    ibex: `
      <path d="M27 16 C22 6 14 2 6 4 C8 6 10 7 12 9 C18 10 22 13 24 18 Z M37 16 C42 6 50 2 58 4 C56 6 54 7 52 9 C46 10 42 13 40 18 Z" fill="#7d6a52" ${line(1.3)}/>
      <path d="M14 7.5 l1.5 2.2 M18 8 l1 2.4 M22 10 l.4 2.6 M50 7.5 l-1.5 2.2 M46 8 l-1 2.4 M42 10 l-.4 2.6" stroke="#e6d6b4" stroke-width="1.2" stroke-linecap="round"/>
      <g ${line()}>
        <path d="M19 23 L11 21 L20 29 Z M45 23 L53 21 L44 29 Z" fill="#a8916f"/>
        <path d="M22 17 C22 11 42 11 42 17 L40 43 C40 51 24 51 24 43 Z" fill="#b39c7a"/>
        <path d="M27 47 C27 54 30 59 32 60 C34 59 37 54 37 47 C35 49 29 49 27 47 Z" fill="#5a4c3e"/>
      </g>
      <circle cx="27" cy="27" r="1.8" fill="${I}"/><circle cx="37" cy="27" r="1.8" fill="${I}"/>
      <ellipse cx="32" cy="44" rx="2.4" ry="1.6" fill="${I}"/>`,
    // ---------- swamp ----------
    gator: `
      <g ${line()}>
        <path d="M4 42 C4 34 12 29 24 29 L44 31 C52 32 60 35 61 39 C61 42 57 43 52 43 L24 45 C14 46 4 47 4 42 Z" fill="#6e7d4c"/>
        <path d="M22 44.6 L52 42.8 C56 43 59 44 59 46 C58 48 54 48.5 50 48.5 L24 49 C16 49.2 8 48 6 45 C10 46 16 45.5 22 44.6 Z" fill="#c9c08f"/>
        <ellipse cx="22" cy="28.5" rx="5" ry="3.6" fill="#6e7d4c"/>
      </g>
      <path d="M28 44.4 l1.5 2.4 l1.5 -2.5 l1.5 2.4 l1.5 -2.5 l1.5 2.4 l1.5 -2.5 l1.5 2.4 l1.5 -2.5 l1.5 2.4 l1.5 -2.5 l1.5 2.4 l1.5 -2.6" fill="#f6f3e6" stroke="${I}" stroke-width=".7" stroke-linejoin="round"/>
      <circle cx="22" cy="27.6" r="2" fill="#d6b44a" ${line(.9)}/><ellipse cx="22" cy="27.6" rx=".6" ry="1.7" fill="${I}"/>
      <circle cx="56" cy="36" r="1" fill="${I}"/>
      <g fill="#556339" opacity=".8"><circle cx="10" cy="38" r="1.4"/><circle cx="15" cy="35" r="1.4"/><circle cx="31" cy="33" r="1.2"/><circle cx="38" cy="34" r="1.2"/></g>`,
    ibis: `
      <g ${line()}>
        <path d="M30 58 L29 46 M36 58 L36 46" fill="none" stroke="#d96b5b" stroke-width="2"/>
        <path d="M12 38 C12 28 22 24 32 26 C40 27 44 32 43 38 C42 45 34 48 26 47 C18 46 12 44 12 38 Z" fill="#f7f6f0"/>
        <path d="M40 30 C40 20 42 13 48 12 C52 12 54 15 53 19 C52 23 47 26 44 31 Z" fill="#f7f6f0"/>
        <path d="M52 15 C57 18 60 25 61 33 C59 27 56 21 51 18 Z" fill="#e0705c"/>
      </g>
      <path d="M47.5 13 C50 12.5 52.5 13.5 53 16.5 C51 17.5 48.5 17 47.5 15.5 Z" fill="#e0705c"/>
      <path d="M14 38 C20 34 26 34 30 37" stroke="#232323" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <circle cx="49" cy="14.8" r="1.2" fill="${I}"/>`,
    spoonbill: `
      <g ${line()}>
        <path d="M30 58 L29 46 M36 58 L36 46" fill="none" stroke="#c4566f" stroke-width="2"/>
        <path d="M12 38 C12 28 22 24 32 26 C40 27 44 32 43 38 C42 45 34 48 26 47 C18 46 12 44 12 38 Z" fill="#f2a3b8"/>
        <path d="M38 30 C38 20 41 14 47 13 C51 13 53 16 52 20 C51 24 46 27 43 31 Z" fill="#f7e9e6"/>
        <path d="M51 16 L58 17 C62 17 63 21 61 22 C59 23 57 21 56 20 L51 20 Z" fill="#a7a38a"/>
      </g>
      <path d="M14 36 C20 31 28 31 34 35" stroke="#d9466a" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".85"/>
      <circle cx="48" cy="16" r="1.3" fill="#c4384f"/><circle cx="48" cy="16" r=".6" fill="${I}"/>`,
    egret: `
      <g ${line()}>
        <path d="M30 63 L31 50 M37 63 L37 50" fill="none" stroke="#2f2f2f" stroke-width="2"/>
        <path d="M14 47 C14 39 22 36 31 37 C38 38 42 42 41 47 C40 52 33 54 26 53 C19 52 14 51 14 47 Z" fill="#fbfaf5"/>
        <path d="M34 39 C30 31 36 26 38 20 C40 14 37 9 42 7 C46 6 48 9 47 12 C45 15 41 15 41 20 C41 26 38 32 38 38 Z" fill="#fbfaf5"/>
        <path d="M46.5 9 L61 12 L46.5 13 Z" fill="#e8c35a"/>
      </g>
      <path d="M16 45 C10 46 6 49 4 53 M17 48 C12 50 9 54 8 58 M19 50 C16 53 15 57 15 60" stroke="#e7e2d4" stroke-width="1" fill="none" stroke-linecap="round"/>
      <circle cx="44" cy="10" r="1.2" fill="#e8c35a" stroke="${I}" stroke-width=".7"/>`,
    woodduck: `
      <g ${line()}>
        <path d="M10 42 C10 33 20 30 30 31 C40 32 47 37 46 44 C45 51 36 54 26 53 C17 52 10 49 10 42 Z" fill="#b58b5e"/>
        <path d="M36 36 C38 34 39 30 39 26 C39 18 45 13 51 14 C55 15 57 19 56 23 C55 27 51 29 47 31 C45 33 43 36 42 39 Z" fill="#2f6b4f"/>
        <path d="M39 22 C40 16 46 11 53 12 C49 13 47 15 46 17 C44 17 41 19 39 22 Z" fill="#3d4f7a"/>
        <path d="M55.5 20 L62 22 C62.5 24 60 25 56 24 Z" fill="#d9504a"/>
        <path d="M34 34 C38 33 41 35 42 39 C40 44 36 47 31 47 C30 42 31 37 34 34 Z" fill="#8a3f2e"/>
      </g>
      <path d="M41 21 C45 18 50 18 54 19 M43 27 C46 26.5 49 26 51 25" stroke="#f4f1e8" stroke-width="1.3" fill="none" stroke-linecap="round"/>
      <path d="M12 44 C18 47 26 48 32 46" stroke="#f4f1e8" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".8"/>
      <circle cx="50.5" cy="20.5" r="1.6" fill="#d9504a" stroke="${I}" stroke-width=".7"/>`,
    // ---------- summer porch ----------
    bat: `
      <g ${line()}>
        <path d="M27 30 C20 22 10 20 2 26 C6 28 7 31 6 35 C10 33 13 34 15 37 C17 34 21 34 24 36 C24 33 25 31 27 30 Z" fill="#6a5244"/>
        <path d="M37 30 C44 22 54 20 62 26 C58 28 57 31 58 35 C54 33 51 34 49 37 C47 34 43 34 40 36 C40 33 39 31 37 30 Z" fill="#6a5244"/>
        <path d="M24 20 L22 9 L29 16 Z M40 20 L42 9 L35 16 Z" fill="#8a6a56"/>
        <path d="M32 15 C39 15 42 21 41 28 C40 36 37 44 32 46 C27 44 24 36 23 28 C22 21 25 15 32 15 Z" fill="#9a7458"/>
      </g>
      <path d="M24.5 17 L23.5 12 L27 15.5 M39.5 17 L40.5 12 L37 15.5" stroke="#d3a28e" stroke-width="1.2" fill="none"/>
      <path d="M8 27 L14 33 M12 24 L17 34 M56 27 L50 33 M52 24 L47 34" stroke="#4a382e" stroke-width=".9" opacity=".7"/>
      <circle cx="28.5" cy="24" r="1.6" fill="${I}"/><circle cx="35.5" cy="24" r="1.6" fill="${I}"/>
      <path d="M30 28.5 C31 29.8 33 29.8 34 28.5" ${line(1)} fill="none"/>`,
    luna: `
      <g ${line()}>
        <path d="M30 30 C22 20 10 18 6 24 C3 30 10 36 22 36 C25 35 28 33 30 30 Z" fill="#bfe0b0"/>
        <path d="M34 30 C42 20 54 18 58 24 C61 30 54 36 42 36 C39 35 36 33 34 30 Z" fill="#bfe0b0"/>
        <path d="M29 34 C22 40 18 48 20 60 C24 54 27 46 30 38 Z" fill="#bfe0b0"/>
        <path d="M35 34 C42 40 46 48 44 60 C40 54 37 46 34 38 Z" fill="#bfe0b0"/>
        <ellipse cx="32" cy="32" rx="3" ry="9" fill="#f4f1e2"/>
      </g>
      <path d="M8 22.5 C14 20 22 21 29 27 M56 22.5 C50 20 42 21 35 27" stroke="#9c6b5a" stroke-width="1.2" fill="none" stroke-linecap="round"/>
      <g ${line(.9)}><circle cx="18" cy="28.5" r="2.4" fill="#f2d36b"/><circle cx="46" cy="28.5" r="2.4" fill="#f2d36b"/><circle cx="25" cy="45" r="1.8" fill="#f2d36b"/><circle cx="39" cy="45" r="1.8" fill="#f2d36b"/></g>
      <path d="M31 23 C29 19 26 17 24 17 M33 23 C35 19 38 17 40 17" stroke="#9c6b5a" stroke-width="1.1" fill="none" stroke-linecap="round"/>`,
    rosymaple: `
      <g ${line()}>
        <path d="M30 26 C24 16 12 16 9 24 C7 31 15 37 28 34 Z" fill="#f2a6bf"/>
        <path d="M34 26 C40 16 52 16 55 24 C57 31 49 37 36 34 Z" fill="#f2a6bf"/>
        <path d="M29 33 C22 37 16 44 18 50 C24 50 28 44 30 37 Z" fill="#f4d465"/>
        <path d="M35 33 C42 37 48 44 46 50 C40 50 36 44 34 37 Z" fill="#f4d465"/>
        <ellipse cx="32" cy="34" rx="5" ry="10" fill="#f6dc6e"/>
      </g>
      <path d="M17 22 C22 24 26 27 29 30 M47 22 C42 24 38 27 35 30" stroke="#f6dc6e" stroke-width="3.2" fill="none" stroke-linecap="round" opacity=".9"/>
      <path d="M27 34 h10 M27.5 38 h9 M28.5 42 h7" stroke="#e7a6ba" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M30 24 C28 20 25 18 23 18 M34 24 C36 20 39 18 41 18" stroke="#c78a52" stroke-width="1.6" fill="none" stroke-linecap="round"/>`,
    polyphemus: `
      <g ${line()}>
        <path d="M30 28 C22 16 8 16 5 25 C3 32 12 38 28 34 Z" fill="#c9a06a"/>
        <path d="M34 28 C42 16 56 16 59 25 C61 32 52 38 36 34 Z" fill="#c9a06a"/>
        <path d="M29 33 C20 34 10 40 10 49 C12 55 24 54 30 40 Z" fill="#b98c58"/>
        <path d="M35 33 C44 34 54 40 54 49 C52 55 40 54 34 40 Z" fill="#b98c58"/>
        <ellipse cx="32" cy="34" rx="3.6" ry="9" fill="#a57a4a"/>
      </g>
      <g ${line(1)}><circle cx="19" cy="45" r="5" fill="#f2d36b"/><circle cx="45" cy="45" r="5" fill="#f2d36b"/></g>
      <circle cx="19" cy="45" r="3" fill="#3f6f9c"/><circle cx="45" cy="45" r="3" fill="#3f6f9c"/>
      <circle cx="19" cy="45" r="1.3" fill="${I}"/><circle cx="45" cy="45" r="1.3" fill="${I}"/>
      <path d="M10 24 C16 23 22 25 27 29 M54 24 C48 23 42 25 37 29" stroke="#f1e2c6" stroke-width="1.2" fill="none" stroke-linecap="round"/>
      <path d="M30 26 C27 21 24 19 21 19 M34 26 C37 21 40 19 43 19" stroke="#8a643c" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,
    tigermoth: `
      <g ${line()}>
        <path d="M29 24 C22 22 12 26 7 36 C6 41 10 43 15 41 C21 38 26 33 30 28 Z" fill="#d9a35a"/>
        <path d="M35 24 C42 22 52 26 57 36 C58 41 54 43 49 41 C43 38 38 33 34 28 Z" fill="#d9a35a"/>
        <path d="M29 31 C24 36 21 43 23 49 C27 47 30 42 31 36 Z" fill="#e8b36e"/>
        <path d="M35 31 C40 36 43 43 41 49 C37 47 34 42 33 36 Z" fill="#e8b36e"/>
        <ellipse cx="32" cy="33" rx="4" ry="11" fill="#c98a3e"/>
      </g>
      <g fill="#5a3e28" opacity=".75"><circle cx="16" cy="34" r="1"/><circle cx="21" cy="31" r="1"/><circle cx="12" cy="38" r=".9"/><circle cx="48" cy="34" r="1"/><circle cx="43" cy="31" r="1"/><circle cx="52" cy="38" r=".9"/></g>
      <path d="M29 33 h6 M29 37 h6 M29.5 41 h5" stroke="#5a3e28" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>
      <path d="M30 23 C28 18 25 16 22 16 M34 23 C36 18 39 16 42 16" stroke="#5a3e28" stroke-width="1.3" fill="none" stroke-linecap="round"/>`,
    // ---------- indian forest ----------
    tiger: `
      <g ${line()}>
        <circle cx="16" cy="18" r="6" fill="#e08a3c"/><circle cx="48" cy="18" r="6" fill="#e08a3c"/>
        <path d="M32 11 C47 11 56 22 55 35 C54 47 45 55 32 55 C19 55 10 47 9 35 C8 22 17 11 32 11 Z" fill="#e6923f"/>
        <path d="M14 38 C16 46 24 52 32 52 C40 52 48 46 50 38 C45 42 38 42 32 40 C26 42 19 42 14 38 Z" fill="#fbf3e4"/>
      </g>
      <circle cx="16" cy="18.5" r="2.6" fill="#3a2a22"/><circle cx="48" cy="18.5" r="2.6" fill="#3a2a22"/>
      <g fill="${I}"><path d="M32 13 L30 21 L32 24 L34 21 Z"/><path d="M24 15 L26 22 L28 16 Z M40 15 L38 22 L36 16 Z"/><path d="M10 28 L18 30 L11 32 Z M54 28 L46 30 L53 32 Z M10 36 L17 36 L11 39 Z M54 36 L47 36 L53 39 Z"/></g>
      <path d="M21 26 C22 24 27 24 28 27 M43 26 C42 24 37 24 36 27" stroke="#fbf3e4" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="25" cy="31" r="2.5" fill="#d6b44a" ${line(1)}/><circle cx="39" cy="31" r="2.5" fill="#d6b44a" ${line(1)}/>
      <circle cx="25" cy="31" r="1.1" fill="${I}"/><circle cx="39" cy="31" r="1.1" fill="${I}"/>
      <path d="M29 39 L35 39 L32 42.5 Z" fill="#c9746a" ${line(.8)}/><path d="M32 42.5 V45 M32 45 Q29 47.5 27 45.5 M32 45 Q35 47.5 37 45.5" ${line(1)} fill="none"/>`,
    chital: `
      <g fill="none" stroke="#8a6a46" stroke-width="2.2" stroke-linecap="round">
        <path d="M26 16 C24 10 20 6 16 4 M23 11 L17 11 M40 11 L47 11 M38 16 C40 10 44 6 48 4"/>
      </g>
      <g ${line()}>
        <path d="M20 22 L9 18 L19 28 Z M44 22 L55 18 L45 28 Z" fill="#c98e55"/>
        <path d="M22 16 C22 10 42 10 42 16 L39 44 C39 52 25 52 25 44 Z" fill="#cf9558"/>
      </g>
      <g fill="#fbf1dc"><circle cx="24" cy="22" r="1"/><circle cx="40" cy="22" r="1"/><circle cx="25" cy="34" r="1"/><circle cx="39" cy="34" r="1"/></g>
      <path d="M29 30 C29.5 36 30.5 41 32 45 C33.5 41 34.5 36 35 30" fill="#fbf1dc" opacity=".7"/>
      <circle cx="26.5" cy="26" r="2" fill="${I}"/><circle cx="37.5" cy="26" r="2" fill="${I}"/>
      <ellipse cx="32" cy="47" rx="2.6" ry="1.8" fill="${I}"/>`,
    sambar: `
      <g fill="none" stroke="#6b5640" stroke-width="2.4" stroke-linecap="round">
        <path d="M27 15 C26 9 23 5 20 3 M24.5 9 L19 10 M37 15 C38 9 41 5 44 3 M39.5 9 L45 10"/>
      </g>
      <g ${line()}>
        <ellipse cx="14" cy="23" rx="8" ry="5" fill="#6e5844" transform="rotate(-20 14 23)"/><ellipse cx="50" cy="23" rx="8" ry="5" fill="#6e5844" transform="rotate(20 50 23)"/>
        <path d="M21 16 C21 10 43 10 43 16 L40 45 C40 54 24 54 24 45 Z" fill="#7a624b"/>
        <ellipse cx="32" cy="48" rx="7" ry="5.5" fill="#5e4b39"/>
      </g>
      <ellipse cx="14" cy="23" rx="4.5" ry="2.2" fill="#c9a98a" transform="rotate(-20 14 23)"/><ellipse cx="50" cy="23" rx="4.5" ry="2.2" fill="#c9a98a" transform="rotate(20 50 23)"/>
      <circle cx="26.5" cy="27" r="2" fill="${I}"/><circle cx="37.5" cy="27" r="2" fill="${I}"/>
      <ellipse cx="32" cy="49" rx="2.6" ry="1.8" fill="${I}"/>`,
    barasingha: `
      <g fill="none" stroke="#8a6a46" stroke-width="1.8" stroke-linecap="round">
        <path d="M27 15 C24 8 18 5 11 5 M22 9 L20 3 M18 6.5 L15 1.5 M14 5.5 L10 1.5 M24 11 L18 11"/>
        <path d="M37 15 C40 8 46 5 53 5 M42 9 L44 3 M46 6.5 L49 1.5 M50 5.5 L54 1.5 M40 11 L46 11"/>
      </g>
      <g ${line()}>
        <path d="M20 22 L9 18 L19 28 Z M44 22 L55 18 L45 28 Z" fill="#c69a5c"/>
        <path d="M22 16 C22 10 42 10 42 16 L39 44 C39 52 25 52 25 44 Z" fill="#d1a465"/>
        <ellipse cx="32" cy="47" rx="6.5" ry="5" fill="#b28650"/>
      </g>
      <circle cx="26.5" cy="26" r="2" fill="${I}"/><circle cx="37.5" cy="26" r="2" fill="${I}"/>
      <ellipse cx="32" cy="48" rx="2.6" ry="1.8" fill="${I}"/>`,
    muntjac: `
      <path d="M27 17 L26 9 L23 6 M26 11 L28 8 M37 17 L38 9 L41 6 M38 11 L36 8" stroke="#6b5640" stroke-width="2" fill="none" stroke-linecap="round"/>
      <g ${line()}>
        <path d="M20 23 L11 19 L19 29 Z M44 23 L53 19 L45 29 Z" fill="#b5703e"/>
        <path d="M23 17 C23 11 41 11 41 17 L38 43 C38 50 26 50 26 43 Z" fill="#c07a44"/>
      </g>
      <path d="M26 18 L30 30 M38 18 L34 30" stroke="#3e2a1e" stroke-width="2" stroke-linecap="round"/>
      <circle cx="26.5" cy="28" r="2" fill="${I}"/><circle cx="37.5" cy="28" r="2" fill="${I}"/>
      <ellipse cx="32" cy="46" rx="2.4" ry="1.7" fill="${I}"/>`,
    // ---------- salmon river ----------
    grizzly: `
      <g ${line()}>
        <circle cx="16" cy="18" r="6" fill="#8a6440"/><circle cx="48" cy="18" r="6" fill="#8a6440"/>
        <path d="M32 11 C47 11 56 22 55 35 C54 47 45 55 32 55 C19 55 10 47 9 35 C8 22 17 11 32 11 Z" fill="#9a7048"/>
        <path d="M22 40 C22 33 27 30 32 30 C37 30 42 33 42 40 C42 47 37 51 32 51 C27 51 22 47 22 40 Z" fill="#c9a27a"/>
      </g>
      <circle cx="16" cy="18.5" r="2.8" fill="#5a4030"/><circle cx="48" cy="18.5" r="2.8" fill="#5a4030"/>
      <path d="M16 26 C20 22 26 22 28 24 M48 26 C44 22 38 22 36 24" stroke="#c9a27a" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/>
      <circle cx="24.5" cy="29" r="2" fill="${I}"/><circle cx="39.5" cy="29" r="2" fill="${I}"/>
      <path d="M28 37 C28 34.5 36 34.5 36 37 C36 39.5 33.5 41 32 41 C30.5 41 28 39.5 28 37 Z" fill="${I}"/>
      <path d="M32 41 V44 M32 44 Q29 46.5 27 44.5 M32 44 Q35 46.5 37 44.5" ${line(1)} fill="none"/>`,
    sockeye: `
      <g ${line()}>
        <path d="M9 34 L1 25 L4 34 L1 43 Z" fill="#6f8a5a"/>
        <path d="M24 26 Q32 17 40 25 Z" fill="#c9443a"/>
        <path d="M8 34 C14 25 30 22 44 25 C52 27 58 30 60 34 C58 38 52 42 44 43 C30 46 14 43 8 34 Z" fill="#d24f40"/>
        <path d="M44 25 C52 27 58 30 60 34 C59 36 57 37.5 54 38.5 L54 42 C50 43 47 43 44 43 C45 37 45 31 44 25 Z" fill="#6f8f5c"/>
      </g>
      <path d="M58 36.5 C56 40 52 41 48 40.5" stroke="${I}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      <circle cx="52" cy="31" r="1.7" fill="#f2d36b" stroke="${I}" stroke-width=".7"/><circle cx="52" cy="31" r=".7" fill="${I}"/>`,
    chinook: `
      <g ${line()}>
        <path d="M9 34 L1 25 L4 34 L1 43 Z" fill="#8a97a2"/>
        <path d="M24 26 Q32 18 40 25 Z" fill="#7d8a96"/>
        <path d="M8 34 C14 25 30 22 44 25 C52 27 58 30 60 34 C58 38 52 42 44 43 C30 46 14 43 8 34 Z" fill="#c2ccd2"/>
        <path d="M9 33 C16 26 30 23.5 44 25.5 C52 27 57 30 59.5 33 C50 31 30 30 9 33 Z" fill="#6e7f8c"/>
      </g>
      <path d="M12 41 C24 44 40 43 52 39" stroke="#e8d4c6" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".8"/>
      <g fill="${I}" opacity=".7"><circle cx="18" cy="31" r="1"/><circle cx="24" cy="29" r="1"/><circle cx="30" cy="30" r="1"/><circle cx="36" cy="28.5" r="1"/><circle cx="42" cy="29.5" r="1"/><circle cx="6" cy="31" r=".8"/><circle cx="4" cy="37" r=".8"/></g>
      <circle cx="52" cy="31.5" r="1.7" fill="#efe9d8" stroke="${I}" stroke-width=".7"/><circle cx="52" cy="31.5" r=".7" fill="${I}"/>`,
    coho: `
      <g ${line()}>
        <path d="M9 34 L1 25 L4 34 L1 43 Z" fill="#7d8c7a"/>
        <path d="M24 26 Q32 18 40 25 Z" fill="#7d8c7a"/>
        <path d="M8 34 C14 25 30 22 44 25 C52 27 58 30 60 34 C58 38 52 42 44 43 C30 46 14 43 8 34 Z" fill="#cfd3cc"/>
        <path d="M10 36 C20 33 36 33 52 35 C48 40 40 42.5 30 42.5 C20 42.5 13 40 10 36 Z" fill="#d86c5c" opacity=".85"/>
        <path d="M44 25 C52 27 58 30 60 34 C58 36 55 37 52 37 C50 33 47 29 44 25 Z" fill="#5e6e5a"/>
      </g>
      <path d="M58.5 35.5 C57 38 55 39.5 52 40" stroke="${I}" stroke-width="1.3" fill="none" stroke-linecap="round"/>
      <g fill="${I}" opacity=".6"><circle cx="22" cy="29" r=".9"/><circle cx="30" cy="27.5" r=".9"/><circle cx="38" cy="27.5" r=".9"/></g>
      <circle cx="51.5" cy="31" r="1.7" fill="#efe9d8" stroke="${I}" stroke-width=".7"/><circle cx="51.5" cy="31" r=".7" fill="${I}"/>`,
    pink: `
      <g ${line()}>
        <path d="M9 36 L1 27 L4 36 L1 45 Z" fill="#8a8f86"/>
        <path d="M10 36 C14 26 22 15 34 15 C42 15 46 22 46 27 C52 29 58 32 60 36 C58 40 52 44 44 45 C30 48 15 45 10 36 Z" fill="#b8bdb4"/>
        <path d="M11 39 C24 43 40 43 54 40 C50 43.5 46 45 40 45.8 C30 47 18 45 11 39 Z" fill="#f2f0e6"/>
      </g>
      <g fill="${I}" opacity=".65"><ellipse cx="20" cy="29" rx="1.6" ry="1.1"/><ellipse cx="26" cy="23" rx="1.6" ry="1.1"/><ellipse cx="33" cy="20" rx="1.6" ry="1.1"/><ellipse cx="38" cy="25" rx="1.6" ry="1.1"/><ellipse cx="30" cy="30" rx="1.4" ry="1"/><ellipse cx="5" cy="32" rx="1" ry=".8"/><ellipse cx="4" cy="40" rx="1" ry=".8"/></g>
      <path d="M58 38 C56 41.5 52 42.5 48 42" stroke="${I}" stroke-width="1.3" fill="none" stroke-linecap="round"/>
      <circle cx="52" cy="33" r="1.6" fill="#efe9d8" stroke="${I}" stroke-width=".7"/><circle cx="52" cy="33" r=".7" fill="${I}"/>`,
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
    saguaro: `
      <g ${line()}>
        <path d="M27 60 L27 14 C27 8 37 8 37 14 L37 60 Z" fill="#7ea862"/>
        <path d="M27 38 L20 38 C15 38 13 35 13 31 L13 22 C13 18 19 18 19 22 L19 31 L27 31 Z" fill="#76a05c"/>
        <path d="M37 32 L44 32 C49 32 51 29 51 25 L51 18 C51 14 45 14 45 18 L45 25 L37 25 Z" fill="#76a05c"/>
      </g>
      <path d="M30 14 V58 M34 14 V58 M16 22 V33 M48 18 V28" stroke="#5c8247" stroke-width="1" opacity=".7"/>
      <ellipse cx="32" cy="27" rx="2" ry="2.6" fill="#3a3326"/>
      <path d="M30 9 l2 -3 l2 3 M14 18 l1.5 -2 l1.5 2" fill="#f2a6bf" stroke="${I}" stroke-width=".8"/>
      <path d="M8 60 q12 -4 24 0 t24 0" stroke="#c9a56a" stroke-width="2" fill="none" opacity=".7"/>`,
    snowdrift: `
      <path d="M4 50 C6 36 18 26 32 26 C46 26 58 36 60 50 Z" fill="#f7fafc" ${line(1.4)}/>
      <path d="M10 50 C14 42 24 37 34 38 C44 39 52 44 56 50" fill="#d6e6f0" opacity=".8"/>
      <path d="M26 50 C26 44 29 41 32 41 C35 41 38 44 38 50 Z" fill="#5a6b78" ${line(1.2)}/>
      <path d="M14 34 C18 30 24 28 28 28 M40 29 C46 30 50 33 53 37" stroke="#b9d2e2" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      <g fill="#ffffff" stroke="#b9d2e2" stroke-width=".6"><circle cx="16" cy="18" r="1.4"/><circle cx="46" cy="14" r="1.2"/><circle cx="34" cy="10" r="1"/><circle cx="54" cy="24" r="1"/></g>`,
    kelp: `
      <g ${line(1.2)}>
        <path d="M24 62 C20 46 28 34 22 18 C20 12 22 6 26 4 C24 12 30 20 28 34 C27 44 30 52 30 62 Z" fill="#a8873e"/>
        <path d="M36 62 C34 50 42 40 38 26 C36 18 40 10 44 8 C42 18 46 26 44 38 C43 46 42 54 42 62 Z" fill="#b8943f"/>
      </g>
      <g fill="#d2b05a" ${line(.9)}><ellipse cx="22" cy="40" rx="2.6" ry="3.4"/><ellipse cx="29" cy="24" rx="2.4" ry="3.2"/><ellipse cx="41" cy="44" rx="2.6" ry="3.4"/><ellipse cx="45" cy="22" rx="2.4" ry="3.2"/></g>
      <path d="M16 42 C12 38 10 32 12 26 M50 30 C54 26 56 20 54 14" stroke="#8f7032" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/>`,
    alpine: `
      <path d="M6 54 C14 46 24 44 32 44 C40 44 50 46 58 54 Z" fill="#9fbf7a" ${line(1.2)}/>
      <path d="M14 52 C14 44 16 36 18 30 M24 50 C24 42 25 34 26 28 M38 50 C38 42 39 34 40 26 M48 52 C48 44 47 38 46 32" stroke="#5f8a46" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <g ${line(.9)}>
        <path d="M18 30 l-3 -5 l3 1 l0 -4 l3 4 l3 -1 Z" fill="#5f88c9"/>
        <circle cx="26" cy="27" r="3.4" fill="#f2d36b"/>
        <path d="M40 26 l-3 -5 l3 1 l0 -4 l3 4 l3 -1 Z" fill="#5f88c9"/>
        <circle cx="46" cy="31" r="3" fill="#f4f1e8"/>
      </g>
      <circle cx="26" cy="27" r="1.2" fill="#c98a3e"/><circle cx="46" cy="31" r="1" fill="#f2d36b"/>`,
    sawgrass: `
      <g fill="#b9b45e" ${line(1.1)}>
        <path d="M14 60 C14 40 10 24 6 10 C14 22 18 38 19 60 Z"/>
        <path d="M24 60 C24 38 26 20 30 4 C31 22 30 40 29 60 Z"/>
        <path d="M34 60 C35 42 40 26 48 12 C44 28 40 44 39 60 Z"/>
        <path d="M44 60 C46 46 52 34 58 26 C54 38 50 50 49 60 Z"/>
      </g>
      <path d="M8 14 l2 1 M10 20 l2 1 M27 10 l2 0 M27 18 l2 0 M44 20 l2 1 M41 28 l2 1" stroke="${I}" stroke-width=".9" opacity=".6"/>`,
    porchlight: `
      <path d="M32 2 V12" stroke="${I}" stroke-width="1.6"/>
      <circle cx="32" cy="34" r="22" fill="#f6dc7a" opacity=".35"/>
      <circle cx="32" cy="34" r="14" fill="#f8e59a" opacity=".55"/>
      <g ${line()}>
        <path d="M24 12 H40 L42 16 H22 Z" fill="#4f4a42"/>
        <path d="M23 16 H41 L39 46 H25 Z" fill="#fbeaa6"/>
        <path d="M22 46 H42 L40 50 H24 Z" fill="#4f4a42"/>
      </g>
      <path d="M28 18 V44 M36 18 V44" stroke="${I}" stroke-width="1" opacity=".55"/>
      <ellipse cx="32" cy="31" rx="3.6" ry="5" fill="#fffbe8"/>
      <path d="M50 18 l3 -2 l1 3 Z M12 44 l3 -2 l1 3 Z" fill="#c9b48e" stroke="${I}" stroke-width=".7"/>`,
    bamboo: `
      <g ${line(1.2)}>
        <path d="M20 62 V4 H27 V62 Z" fill="#8fb35c"/><path d="M34 62 V10 H40 V62 Z" fill="#a1c26a"/><path d="M46 62 V18 H51 V62 Z" fill="#8fb35c"/>
      </g>
      <path d="M20 18 H27 M20 34 H27 M20 50 H27 M34 24 H40 M34 40 H40 M34 56 H40 M46 30 H51 M46 46 H51" stroke="#5f8a46" stroke-width="1.6"/>
      <g fill="#7ea862" ${line(.9)}>
        <path d="M27 18 C33 14 38 14 42 16 C37 18 32 19 27 18 Z"/><path d="M20 34 C14 30 9 30 5 32 C10 34 15 35 20 34 Z"/>
        <path d="M40 40 C46 37 51 37 55 39 C50 41 45 41 40 40 Z"/><path d="M34 24 C30 20 26 19 22 20" fill="none"/>
      </g>`,
    waterfall: `
      <path d="M10 16 V48 M18 14 V50 M26 16 V48 M34 14 V50 M42 16 V48 M50 14 V50" stroke="#f4fbff" stroke-width="2.2" stroke-linecap="round" opacity=".85"/>
      <path d="M6 52 q5 -4 10 0 t10 0 t10 0 t10 0 t10 0" stroke="${I}" stroke-width="1" fill="none" opacity=".6"/>`,
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
    desert: `
      <defs>${wc}<linearGradient id="zk-ds" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9c9d6" stop-opacity="0.6"/><stop offset="1" stop-color="#f2b57d" stop-opacity="0.85"/></linearGradient></defs>
      <g filter="url(#zk-wc)">
        <path d="M-20 -20 H420 V216 Q330 228 240 220 Q150 212 60 226 Q20 232 -20 226 Z" fill="url(#zk-ds)"/>
        <path d="M-20 220 L40 196 L90 206 L150 188 L210 210 L270 192 L330 204 L420 186 V240 H-20 Z" fill="#a98fb3" opacity="0.55"/>
        <path d="M-20 236 Q100 222 200 234 Q300 246 420 228 V290 H-20 Z" fill="#e2b981" opacity="0.7"/>
        <circle cx="300" cy="190" r="22" fill="#f6dc8a" opacity="0.7"/>
      </g>
      <g fill="#7ea862" opacity="0.85" ${line(1.1)}>
        <path d="M60 238 V200 C60 194 68 194 68 200 V238 Z M60 220 H54 C50 220 49 217 49 214 V206 C49 203 54 203 54 206 V214 H60 Z M68 214 H73 V207 C73 204 78 204 78 207 V213 C78 217 76 219 72 219 H68 Z"/>
        <path d="M352 238 V214 C352 210 357 210 357 214 V238 Z M352 226 H348 V219 C348 216 352 216 352 219 Z"/>
      </g>
      <g fill="none" ${line(1.1)} opacity="0.75">
        <path d="M-20 220 L40 196 L90 206 L150 188 L210 210 L270 192 L330 204 L420 186"/>
        <g class="zk-drift"><path d="M170 110 q5 -4 10 0 q5 -4 10 0 M196 124 q4 -3 8 0 q4 -3 8 0"/></g>
      </g>`,
    tundra: `
      <defs>${wc}<linearGradient id="zk-tn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f4a63" stop-opacity="0.85"/><stop offset="0.7" stop-color="#7d9bb0" stop-opacity="0.6"/><stop offset="1" stop-color="#dfe8ee" stop-opacity="0.6"/></linearGradient></defs>
      <g filter="url(#zk-wc)">
        <path d="M-20 -20 H420 V220 Q330 232 240 224 Q150 216 60 230 Q20 236 -20 230 Z" fill="url(#zk-tn)"/>
        <path d="M40 40 C100 90 160 60 220 100 C280 140 340 90 400 120" stroke="#8fe3b8" stroke-width="26" fill="none" opacity="0.35"/>
        <path d="M20 70 C90 110 170 80 230 120 C290 160 350 120 420 150" stroke="#b8f0d0" stroke-width="12" fill="none" opacity="0.3"/>
        <path d="M-20 228 Q90 214 200 226 Q300 238 420 220 V290 H-20 Z" fill="#f4f8fa" opacity="0.9"/>
        <path d="M-20 214 L60 200 L120 210 L200 196 L280 212 L360 198 L420 206 V232 H-20 Z" fill="#c9d6e0" opacity="0.7"/>
      </g>
      <g class="zk-flies" fill="#fbf6ea"><circle cx="60" cy="30" r="1.3"/><circle cx="180" cy="20" r="1.1"/><circle cx="300" cy="40" r="1.3"/><circle cx="360" cy="18" r="1"/></g>
      <g class="zk-snow" fill="#ffffff" opacity="0.85"><circle cx="90" cy="60" r="1.4"/><circle cx="210" cy="90" r="1.2"/><circle cx="330" cy="70" r="1.4"/><circle cx="140" cy="140" r="1.1"/></g>`,
    kelp: `
      <defs>${wc}<linearGradient id="zk-kp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd0c6" stop-opacity="0.85"/><stop offset="1" stop-color="#3f7f7a" stop-opacity="0.8"/></linearGradient></defs>
      <g filter="url(#zk-wc)">
        <path d="M-20 -20 H420 V236 Q320 250 220 240 Q120 230 20 246 L-20 246 Z" fill="url(#zk-kp)"/>
        <polygon points="120,0 170,0 150,210 96,210" fill="#ffffff" opacity="0.14"/>
        <polygon points="260,0 300,0 320,210 270,210" fill="#ffffff" opacity="0.12"/>
        <path d="M-20 250 Q60 236 140 248 Q220 258 300 244 Q360 236 420 246 V290 H-20 Z" fill="#9c8a5e" opacity="0.6"/>
      </g>
      <g fill="#a8873e" opacity="0.8" ${line(1)}>
        <path d="M30 250 C22 200 40 160 30 110 C26 80 34 50 40 30 C42 60 40 90 44 120 C50 170 38 210 42 250 Z"/>
        <path d="M370 250 C380 200 362 160 372 110 C376 80 368 50 362 30 C360 60 362 90 358 120 C352 170 364 210 360 250 Z"/>
      </g>
      <g fill="#d2b05a" opacity="0.9"><circle cx="36" cy="150" r="3"/><circle cx="34" cy="100" r="3"/><circle cx="366" cy="140" r="3"/><circle cx="368" cy="90" r="3"/></g>
      <g fill="none" stroke="${I}" stroke-width="0.9" opacity="0.55">
        <g class="zk-bubbles"><circle cx="330" cy="200" r="3"/><circle cx="336" cy="180" r="2"/></g>
        <g class="zk-bubbles zk-late"><circle cx="70" cy="190" r="2.5"/><circle cx="76" cy="170" r="1.8"/></g>
      </g>`,
    mountain: `
      <defs>${wc}<linearGradient id="zk-mt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bcd3e6" stop-opacity="0.85"/><stop offset="1" stop-color="#eae4d8" stop-opacity="0.6"/></linearGradient></defs>
      <g filter="url(#zk-wc)">
        <path d="M-20 -20 H420 V216 Q330 228 240 220 Q150 212 60 226 Q20 232 -20 226 Z" fill="url(#zk-mt)"/>
        <path d="M-20 214 L50 130 L90 170 L150 96 L210 168 L250 140 L310 190 L360 120 L420 180 V240 H-20 Z" fill="#8c96a8" opacity="0.6"/>
        <path d="M130 120 L150 96 L170 122 L160 118 L150 126 L140 117 Z M340 142 L360 120 L378 146 L366 140 L358 148 L350 140 Z M36 148 L50 130 L64 150 L54 146 L48 152 Z" fill="#ffffff" opacity="0.95"/>
        <path d="M-20 232 Q100 214 200 228 Q300 242 420 222 V290 H-20 Z" fill="#9fb07e" opacity="0.6"/>
      </g>
      <g fill="none" ${line(1.1)} opacity="0.7">
        <path d="M-20 214 L50 130 L90 170 L150 96 L210 168 L250 140 L310 190 L360 120 L420 180"/>
        <g class="zk-drift"><path d="M220 80 q6 -5 12 0 q6 -5 12 0"/></g>
      </g>`,
    swamp: `
      <defs>${wc}<linearGradient id="zk-sw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8e2c0" stop-opacity="0.7"/><stop offset="1" stop-color="#a9b98a" stop-opacity="0.8"/></linearGradient></defs>
      <g filter="url(#zk-wc)">
        <path d="M-20 -20 H420 V216 Q330 226 240 218 Q150 210 60 222 Q20 228 -20 222 Z" fill="url(#zk-sw)"/>
        <ellipse cx="70" cy="120" rx="60" ry="40" fill="#6f8a5a" opacity="0.6"/>
        <ellipse cx="340" cy="110" rx="70" ry="44" fill="#6f8a5a" opacity="0.6"/>
        <path d="M-20 226 Q100 214 200 226 Q300 238 420 220 V250 H-20 Z" fill="#c9b964" opacity="0.6"/>
        <path d="M-20 240 Q120 232 220 242 Q320 250 420 236 V290 H-20 Z" fill="#7fa5a0" opacity="0.6"/>
      </g>
      <g fill="none" ${line(1.1)} opacity="0.8">
        <path d="M70 236 V130 M70 160 C60 150 52 148 44 150 M70 150 C80 140 90 138 98 140"/>
        <path d="M340 236 V124 M340 150 C330 142 322 140 314 142 M340 140 C352 132 362 132 370 134"/>
        <path d="M52 150 C50 162 52 172 50 180 M60 150 C60 166 58 176 60 186 M90 140 C92 154 90 166 92 176 M322 142 C320 156 322 168 320 176 M362 134 C364 148 362 160 364 170"/>
        <path d="M62 236 l-6 6 M78 236 l6 6 M332 236 l-6 6 M348 236 l6 6"/>
        <g class="zk-drift"><path d="M180 120 q5 -4 10 0 q5 -4 10 0"/></g>
      </g>`,
    porch: `
      <defs>${wc}<linearGradient id="zk-pc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f3f6e" stop-opacity="0.85"/><stop offset="0.7" stop-color="#8a7aa8" stop-opacity="0.6"/><stop offset="1" stop-color="#e2c9b8" stop-opacity="0.5"/></linearGradient></defs>
      <g filter="url(#zk-wc)">
        <path d="M-20 -20 H420 V220 Q330 232 240 224 Q150 216 60 230 Q20 236 -20 230 Z" fill="url(#zk-pc)"/>
        <circle cx="330" cy="150" r="60" fill="#f6dc7a" opacity="0.28"/>
        <path d="M-20 232 Q90 220 200 230 Q300 240 420 226 V290 H-20 Z" fill="#5f7a5a" opacity="0.6"/>
        <ellipse cx="60" cy="210" rx="56" ry="26" fill="#4f6a4c" opacity="0.6"/>
      </g>
      <g fill="none" ${line(1.2)} opacity="0.85">
        <path d="M290 236 V100 M380 236 V100 M280 100 H400 M290 180 H380 M300 180 V236 M320 180 V236 M340 180 V236 M360 180 V236"/>
        <path d="M330 100 V128"/>
      </g>
      <g ${line(1.1)}><path d="M322 128 H338 L336 150 H324 Z" fill="#fbeaa6"/></g>
      <g fill="#fbf6ea" opacity="0.8"><circle cx="40" cy="40" r="1.1"/><circle cx="120" cy="20" r="1.2"/><circle cx="200" cy="50" r="1"/><circle cx="250" cy="24" r="1.1"/></g>
      <g class="zk-flies" fill="#f2d36b"><circle cx="90" cy="200" r="1.8"/><circle cx="150" cy="186" r="1.6"/><circle cx="230" cy="204" r="1.8"/><circle cx="40" cy="180" r="1.4"/></g>`,
    india: `
      <defs>${wc}<linearGradient id="zk-in" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1dcb2" stop-opacity="0.7"/><stop offset="1" stop-color="#c9b68a" stop-opacity="0.75"/></linearGradient></defs>
      <g filter="url(#zk-wc)">
        <path d="M-20 -20 H420 V216 Q330 228 240 220 Q150 212 60 226 Q20 232 -20 226 Z" fill="url(#zk-in)"/>
        <ellipse cx="80" cy="150" rx="70" ry="50" fill="#7f9a5c" opacity="0.55"/>
        <ellipse cx="330" cy="140" rx="80" ry="54" fill="#7f9a5c" opacity="0.55"/>
        <ellipse cx="200" cy="200" rx="200" ry="22" fill="#ffffff" opacity="0.3"/>
        <path d="M-20 232 Q100 220 200 230 Q300 240 420 224 V290 H-20 Z" fill="#a9a35f" opacity="0.6"/>
      </g>
      <g fill="none" ${line(1.1)} opacity="0.8">
        <path d="M50 236 V120 M62 236 V104 M74 236 V128 M50 150 H56 M50 180 H56 M62 140 H68 M62 172 H68 M74 160 H80 M74 196 H80 M56 120 C64 112 72 112 78 116 M68 104 C60 98 52 98 46 102"/>
        <path d="M330 236 V140 M330 168 C320 160 310 158 302 160 M330 158 C342 150 352 150 360 152"/>
        <path d="M150 236 C150 222 148 210 150 198 M160 236 C162 220 164 208 168 198 M250 236 C248 222 246 212 242 204"/>
        <g class="zk-drift"><path d="M190 100 q5 -4 10 0 q5 -4 10 0"/></g>
      </g>`,
    river: `
      <defs>${wc}<linearGradient id="zk-rv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe0e6" stop-opacity="0.8"/><stop offset="1" stop-color="#9fc0c6" stop-opacity="0.7"/></linearGradient></defs>
      <g filter="url(#zk-wc)">
        <path d="M-20 -20 H420 V216 Q330 228 240 220 Q150 212 60 226 Q20 232 -20 226 Z" fill="url(#zk-rv)"/>
        <path d="M-20 200 L10 150 L30 170 L50 130 L70 168 L90 140 L110 200 Z" fill="#4f6a52" opacity="0.7"/>
        <path d="M290 200 L310 150 L330 172 L350 126 L370 166 L390 140 L420 200 Z" fill="#4f6a52" opacity="0.7"/>
        <path d="M150 120 H250 L246 220 H154 Z" fill="#eaf6fa" opacity="0.8"/>
        <path d="M-20 224 Q100 214 200 224 Q300 234 420 218 V290 H-20 Z" fill="#7fb0bd" opacity="0.65"/>
      </g>
      <g fill="none" ${line(1.1)} opacity="0.75">
        <path d="M140 120 H260 M150 120 C140 130 136 150 140 170 M250 120 C260 130 264 150 260 170"/>
        <path d="M166 130 V214 M182 126 V216 M200 128 V218 M218 126 V216 M234 130 V214" stroke="#ffffff" stroke-width="2" opacity=".9"/>
        <path d="M20 236 q8 -3 16 0 M330 232 q8 -3 16 0"/>
      </g>
      <g class="zk-bubbles" fill="#d24f40" stroke="${I}" stroke-width="0.8"><path d="M190 150 q8 -5 16 0 q-8 5 -16 0 z M190 150 l-4 -3 v6 z"/></g>`,
  };

  window.ZART = { ART, SCENES };
})();
