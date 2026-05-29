<script setup lang="ts">
import TimelineSection from '../components/TimelineSection.vue'
</script>

<template>
  <div class="about-container">
    <div class="profile-card">
      <div class="avatar">🩸</div>
      <div class="info">
        <h2>Aoi Hinamori (阿歐依)</h2>
        <p class="subtitle">個人勢虛擬YouTuber / 吸血鬼護士</p>
        <p class="bio">
          一位來自魔界、在人間開張特別診所的吸血鬼護士。為了讓前來就診的患者們充滿笑容而成為
          VTuber，擅長趣味雜談、ASMR、搞怪企劃與遊戲實況。
        </p>
      </div>
    </div>

    <div class="exhibit-intro">
      <h3>關於本次數位推文特展</h3>
      <p>
        本展覽將以「阿歐依 《蝕 / 光》畫展」為主題。本次特別展出了 Aoi 與特邀合作藝術家
        <strong>@chocobanadd</strong> 老師、<strong>@star_2290</strong>
        老師的珍貴創作與對話紀錄。歡迎所有患者一起來觀看！
      </p>
    </div>

    <TimelineSection />
  </div>
</template>

<style scoped>
.about-container {
  max-width: 750px;
  margin: 0 auto;
}
.profile-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;
}
.avatar {
  font-size: 3.5rem;
  background: rgba(255, 77, 109, 0.1);
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.info h2 {
  margin: 0;
}
.subtitle {
  color: var(--primary-color);
  font-size: 0.9rem;
  margin: 0.25rem 0 0.75rem 0;
  font-weight: 500;
}
.bio {
  color: #d1d5db;
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
}
.exhibit-intro {
  margin-top: 2.5rem;
  border-left: 4px solid var(--primary-color);
  padding-left: 1.5rem;
  line-height: 1.7;
  color: var(--text-muted);
}
.exhibit-intro h3 {
  color: #fff;
  margin-bottom: 0.5rem;
}
</style>
