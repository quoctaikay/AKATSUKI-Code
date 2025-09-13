/* =========================================================
   keys.js — UCHIHA • One-Device Key System (VIP) — v2.2 (patched)
   - Plain key:   "VIP-7D-ABC": { plan:{days:7},  note:"VIP 7 ngày" }
   - Monthly key: "VIP-1M-XYZ": { plan:{months:1}, note:"VIP 1 tháng" }
   - Hashed key:  "sha256:<HEX>": { plan:{days:30}, note:"VIP băm 30 ngày" }
   - Absolute exp (override):    { exp:"2026-12-31T23:59:59Z" }

   Tính năng:
   ✅ Bind 1 thiết bị (fingerprint)
   ✅ Khoá nếu dùng trên thiết bị khác
   ✅ Khoá khi nhập sai ≥ 5 lần
   ✅ Hạn theo ngày/tháng hoặc exp tuyệt đối
   ✅ Hỗ trợ key băm sha256
   ✅ Zalo “Gia hạn”
   ✅ Khi hết hạn → lock vĩnh viễn (expired_lock) ⇒ nhập lại cũng không vào được
========================================================= */
(function () {
  const ZALO_RENEW_URL = "https://zalo.me/0394615632"; // TODO: đổi sang Zalo của bạn

  // ====== DANH MỤC KEY ======
  // Bạn có thể trộn key thường, key băm, key exp tuyệt đối
  window.UCHIHA_KEYS = {
    // Ví dụ sẵn có
    "Kay-Demo1": { plan:{days:0},  note:"VIP 1 Ngày" },
    "anhkaycte1": { plan:{day:1}, note:"DEMO TEST" },

    /* ====== 100 key PhucPhan-XXXXXX (6 chữ) — VIP 30 ngày ====== */
    "Kay-Demo2": { plan:{days:1}, note:"VIP 1 ngày" },
    "Kay-Demo3": { plan:{days:1}, note:"VIP 1 ngày" },
    "Kay-Demo4": { plan:{days:1}, note:"VIP 1 ngày" },
    "Kay-VNYWQE": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-KDGPSM": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-RTEJAL": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-BZQYNP": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-MLCXVD": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-PWKJUF": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-STHNQG": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-AYXKRM": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-UQZJTN": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-NVRLQX": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-GMWPCK": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-DEYHRT": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-LBSQVF": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-TCKZMN": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-FJQWPA": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-RYVNDK": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-ZAMTLH": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-WQJXPR": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-HCNVBL": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-KXRTEM": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-PJLYQU": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-MZKHSD": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-VQBNLC": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-TXFZRA": { plan:{days:30}, note:"VIP 30 ngày" },"Kay-GPRKJW": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-SLDQNM": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-YHTBQT": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-CDPXVR": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-AKQJTM": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-NBWFQL": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-UZMRHP": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-JLYCNS": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-QHWZEK": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-RMPVJA": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-DQSYHL": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-FZKXUT": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-WNVQBR": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-HTPZCM": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-KJRWDX": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-LQVBSA": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-MPDZNT": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-SFRQWA": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-YZTKPL": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-VBNQMC": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-CTXJRH": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-GKDZPW": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-PJNQUX": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-RMCHTY": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-WZALQK": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-HNYXVB": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-KTPQSD": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-LWRMJC": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-QZKTVA": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-AHFQZN": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-UYPCMR": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-DLMRTX": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-SJBQKW": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-YQNRHZ": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-VCTKLM": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-GXBQJP": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-NDKRWF": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-PJQHZA": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-RTFKLM": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-WCMQPX": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-HZBTRN": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-KQXVDJ": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-LNYQSA": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-MQKZPT": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-SYJQLM": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-YVNRQC": { plan:{days:30}, note:"VIP 30 ngày" },"Kay-VJXKTD": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-CGLQMP": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-GQZHTN": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-Sieudeptrai": { plan:{days:365}, note:"VIP 365 ngày" },
    "Kay-Limited": { plan:{days:vv}, note:"VIP Limited" },
    "Kay-RJTYKM": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-WQBNZR": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-HBKQMP": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-KZLQTN": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-LCPRMX": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-MQXJRD": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-SZKQTM": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-YJRPWL": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-VQKZHN": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-CTMQLP": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-GZPRKM": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-NDWQXL": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-PBKQZS": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-RMLTXQ": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-WZXPRN": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-HHNQKM": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-KTRQXM": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-LZQPMN": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-MCRQTL": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-STZQPN": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-YKQMRL": { plan:{days:30}, note:"VIP 30 ngày" },
    "Kay-VBPQXN": { plan:{days:30}, note:"VIP 30 ngày" }
  };

  // ====== STORAGE ======
  const STORE_BIND   = "uchiha_bindings_v2";    // { keyId:{ fp, start, exp, locked?, reason?, lockAt? } }
  const STORE_FAILS  = "uchiha_fail_counts_v2"; // { keyId:number }
  const FAIL_LIMIT   = 5;

  // ====== UTILS ======
  const now = () => Date.now();
  const load = (k, fb) => { try{ return JSON.parse(localStorage.getItem(k) || JSON.stringify(fb)); }catch{ return fb; } };
  const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
  const toKeyId = (s) => s.trim();
  function parsePlanStart(startISO, plan){
    const d = new Date(startISO);
    if (plan?.days)   d.setDate(d.getDate() + Number(plan.days||0));
    if (plan?.months) d.setMonth(d.getMonth() + Number(plan.months||0));
    return d.getTime();
  }
  async function sha256Hex(str){
    const enc = new TextEncoder().encode(str);
    const buf = await crypto.subtle.digest("SHA-256", enc);
    return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,"0")).join("");
  }
  function getFingerprint(){
    const parts = [
      navigator.userAgent,
      navigator.language,
      screen.width+"x"+screen.height+"@"+(window.devicePixelRatio||1),navigator.hardwareConcurrency||0,
      Intl.DateTimeFormat().resolvedOptions().timeZone||""
    ];
    return btoa(parts.join("|"));
  }

  // ====== CORE API ======
  const API = {
    renewUrl(){ return ZALO_RENEW_URL; },

    /** Xác thực key + bind 1 thiết bị; hết hạn → lock vĩnh viễn */
    async verifyKey(inputKey){
      const keyRaw = inputKey.trim();
      if(!keyRaw) return { ok:false, msg:"Hãy nhập key." };

      // tra meta
      let meta = window.UCHIHA_KEYS[keyRaw];
      if(!meta){
        const hx = await sha256Hex(keyRaw);
        for(const k in window.UCHIHA_KEYS){
          if(k.startsWith("sha256:") && k.slice(7).toLowerCase() === hx.toLowerCase()){
            meta = window.UCHIHA_KEYS[k]; break;
          }
        }
      }
      if(!meta) return API._fail(keyRaw, "Key không tồn tại hoặc sai.", "not_found");

      const keyId = toKeyId(keyRaw);
      const binds = load(STORE_BIND, {});
      const fails = load(STORE_FAILS, {});
      const rec   = binds[keyId] || {};
      const fp    = getFingerprint();

      // đang bị khoá?
      if (rec.locked) {
        const why = rec.reason || "locked";
        const msg =
          why === "expired_lock"   ? "Key đã hết hạn và bị khoá. Vui lòng liên hệ gia hạn." :
          why === "device_mismatch"? "Key đã gắn với thiết bị khác. Truy cập bị chặn." :
          why === "too_many_fail"  ? `Key bị khoá do nhập sai ${FAIL_LIMIT} lần.` :
                                      "Key đang bị khoá.";
        return { ok:false, msg, reason:why, renew:ZALO_RENEW_URL };
      }

      // quá số lần sai → khoá
      if ((fails[keyId]||0) >= FAIL_LIMIT) {
        rec.locked = true; rec.reason = "too_many_fail"; rec.lockAt = now();
        binds[keyId] = rec; save(STORE_BIND, binds);
        return { ok:false, msg:`Key bị khoá do nhập sai ${FAIL_LIMIT} lần. Nhấn “Gia hạn/Liên hệ”.`, reason:"too_many_fail", renew:ZALO_RENEW_URL };
      }

      // ưu tiên exp tuyệt đối trong meta
      if (meta.exp) {
        const expAbs = new Date(meta.exp).getTime();
        if (expAbs && now() > expAbs) {
          rec.locked = true; rec.reason = "expired_lock"; rec.lockAt = now();
          binds[keyId] = rec; save(STORE_BIND, binds);
          return { ok:false, msg:"Key đã hết hạn và bị khoá. Vui lòng liên hệ gia hạn.", reason:"expired_lock", renew:ZALO_RENEW_URL };
        }
      }

      // đã từng bind?
      if (rec.fp) {
        if (rec.fp !== fp) {
          rec.locked = true; rec.reason = "device_mismatch"; rec.lockAt = now();
          binds[keyId] = rec; save(STORE_BIND, binds);
          return { ok:false, msg:"Key đã gắn với thiết bị khác. Truy cập bị chặn.", reason:"device_mismatch", renew:ZALO_RENEW_URL };
        }
        const expAt = meta.exp ? new Date(meta.exp).getTime() : (rec.exp||0);
        if (expAt && now() > expAt) {rec.locked = true; rec.reason = "expired_lock"; rec.lockAt = now();
          binds[keyId] = rec; save(STORE_BIND, binds);
          return { ok:false, msg:"Key đã hết hạn và bị khoá. Vui lòng liên hệ gia hạn.", reason:"expired_lock", renew:ZALO_RENEW_URL };
        }
        return { ok:true, msg:"Xác thực thành công.", exp:expAt||null, note:meta.note||"" };
      }

      // lần đầu bind
      const startISO = new Date().toISOString();
      const expTime  = (meta.exp) ? new Date(meta.exp).getTime()
                                  : (meta.plan ? parsePlanStart(startISO, meta.plan) : 0);

      // quá hạn ngay lúc bind → khoá luôn
      if (expTime && now() > expTime) {
        binds[keyId] = { fp, start:startISO, exp:expTime||0, locked:true, reason:"expired_lock", lockAt:now() };
        save(STORE_BIND, binds);
        return { ok:false, msg:"Key đã hết hạn và bị khoá. Vui lòng liên hệ gia hạn.", reason:"expired_lock", renew:ZALO_RENEW_URL };
      }

      // bind hợp lệ
      binds[keyId] = { fp, start:startISO, exp:expTime||0, locked:false };
      save(STORE_BIND, binds);

      // clear fail counter nếu có
      if (fails[keyId]) { delete fails[keyId]; save(STORE_FAILS, fails); }

      return { ok:true, msg:"Key đã kích hoạt cho thiết bị này.", exp:expTime||null, note:meta.note||"" };
    },

    /** ghi nhận nhập sai + tự khoá nếu vượt limit */
    _fail(keyRaw, message, reason){
      const keyId = toKeyId(keyRaw);
      const fails = load(STORE_FAILS, {});
      fails[keyId] = (fails[keyId]||0) + 1;
      if (fails[keyId] >= FAIL_LIMIT) {
        save(STORE_FAILS, fails);
        const binds = load(STORE_BIND, {});
        const rec = binds[keyId] || {};
        rec.locked = true; rec.reason = "too_many_fail"; rec.lockAt = now();
        binds[keyId] = rec; save(STORE_BIND, binds);
        return { ok:false, msg:`Key bị khoá do nhập sai ${FAIL_LIMIT} lần. Nhấn “Gia hạn/Liên hệ”.`, reason:"too_many_fail", renew:ZALO_RENEW_URL };
      }
      save(STORE_FAILS, fails);
      return { ok:false, msg:message||"Key không hợp lệ.", reason:reason||"invalid" };
    },

    /** Admin reset: gỡ bind & fail counter (chỉ khi cần) */
    adminReset(keyRaw){
      const keyId = toKeyId(keyRaw);
      const binds = load(STORE_BIND, {}); const fails = load(STORE_FAILS, {});
      delete binds[keyId]; delete fails[keyId];
      save(STORE_BIND, binds); save(STORE_FAILS, fails);
      return { ok:true, msg:"Đã xoá bind & fail counter. Key sẵn sàng kích hoạt lại." };
    }
  };

  // Public API
  window.UCHIHA = API;
})();
