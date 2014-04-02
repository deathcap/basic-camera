var glm = require('gl-matrix')
var vec3 = glm.vec3
var mat3 = glm.mat3
var mat4 = glm.mat4

module.exports = noclip

function noclip(position) {
  if (!(this instanceof noclip)) return new noclip(position)

  this.position = position || vec3.create()
  this.rotationX = this.rotationY = this.rotationZ = 0.0
  this.cameraVector = vec3.create()
}

noclip.prototype.updateCameraVector = function(v, m) {
  // extract the direction vector (v) from 3x3 rotation subset of matrix (m)
  // see THREE.js Vector3 transformDirection, and voxel-view cameraVector()

  v[0] = m[0] + m[4] + m[8]
  v[1] = m[1] + m[5] + m[9]
  v[2] = m[2] + m[6] + m[10]

  vec3.normalize(v, v)
}


noclip.prototype.view = function(output) {
  if (!output) output = mat4.create()

  mat4.rotateX(output, output, this.rotationX)
  mat4.rotateY(output, output, this.rotationY)
  mat4.rotateZ(output, output, this.rotationZ)

  this.updateCameraVector(this.cameraVector, output)

  mat4.translate(output
    , output
    , this.position
  )

  return output
}

noclip.prototype.rotateX   = function(angle) {
  this.rotationX += angle
  return this
}

noclip.prototype.rotateY   = function(angle) {
  this.rotationY += angle
  return this
}

noclip.prototype.rotateZ   = function(angle) {
  this.rotationZ += angle
  return this
}
