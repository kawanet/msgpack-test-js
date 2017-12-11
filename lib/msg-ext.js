// a stub

function MsgExt(type, buffer) {
  this.type = type;
  this.buffer = buffer;
}

exports.MsgExt = MsgExt;

MsgExt.prototype._isMsg = true;
